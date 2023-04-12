// Frameworks
import * as _ from 'lodash'

// App Components
import { Helpers } from '../../utils/helpers'
import { getUserWalletDetails } from '../../utils/fetchApi/getUserWalletDetails'
import {
  allReady,
  connectedAccount,
  logout,
  updateAccount,
  fetchWalletRequest,
} from '../../../redux/actions/walletActions'

import USDTData from '../../../blockchain/contracts/USDT.json'
import GemData from '../../../blockchain/contracts/Gem.json'
import { ContractHelpers } from '../../../blockchain/contract-helpers'

class IWalletBase {
  constructor(type, siteTitle, siteLogoUrl, dispatch) {
    this.type = type
    this.siteTitle = siteTitle
    this.siteLogoUrl = siteLogoUrl
    this.dispatchState = dispatch

    this.web3 = null
    this.provider = null
    this.onboarding = null
  }

  static isEnabled() {
    return this.web3 ? true : false
  }

  async prepare() {
    console.log('Wallet prepared!')
  }

  async connect() {
    return await this.changeUserAccount()
  }

  async disconnect() {
    this.dispatchState(logout())
  }

  async update(address) {
    let payload = {
      balance: {},
      gemsAttributes: [],
      isUSDTSpendingAllowed: false,
    }

    // Setting IsFetching true
    this.dispatchState(fetchWalletRequest())
    // Fetching user wallet details
    payload = await this.getWalletDetails(address, payload)

    this.dispatchState(updateAccount(payload))
    return true
  }

  async getWalletDetails(address, payload) {
    const walletDetails = await getUserWalletDetails.walletDetails(address)

    console.log('walletDetails', walletDetails);

    // Fetching MATIC balance
    const maticBalance =
      walletDetails.items.filter(
        (item) => item.contract_ticker_symbol === 'MATIC',
      )[0].balance ?? 0

    let nftData = walletDetails.items.filter(
      (item) => item.contract_ticker_symbol === 'GEM',
    )

    const usdtData = walletDetails.items.filter(
      (item) => item.contract_ticker_symbol === 'USDT',
    )

    const usdtBalance = usdtData.length > 0 ? usdtData[0].balance : 0

    const balance = {
      MATIC: Helpers.toEther(maticBalance),
      USDT: parseFloat(usdtBalance) / 1000000,
    }

    payload.balance = balance

    const usdtAllowanceAmount = await Helpers.checkAssetAllowance(
      address,
      GemData.address,
      USDTData.abi,
      USDTData.address,
    )
    payload.isUSDTSpendingAllowed = usdtAllowanceAmount > 0

    let userGems = []
    if (nftData.length > 0) {
      nftData = nftData[0].nft_data
      let userGemsDetails = {
        tokenId: '',
        metaData: {},
        name: '',
        chipsBalance: '',
        isApprovedForRelease: false,
        isApprovedForTimelock: false,
      }
      nftData.forEach(async (gem) => {
        userGemsDetails = {
          tokenId: gem.token_id,
          metaData: gem.external_data,
          name: gem.external_data.name,
          chipsBalance: parseInt(
            (await Helpers.userChipsBalance(gem.token_id)) / 1000000,
          ),
          isApprovedForRelease: await ContractHelpers.isApprovedForRelease(
            gem.token_id,
          ),
          isApprovedForTimelock: await ContractHelpers.isApprovedForTimelock(
            gem.token_id,
          ),
        }
        userGems.push(userGemsDetails)
      })
    }

    payload.gemsAttributes = userGems
    return payload
  }

  async changeUserAccount(accounts) {
    this.dispatchState(allReady(false))
    // dispatch
    this.dispatchState(fetchWalletRequest())
    let payload = {
      networkId: 0,
      type: '',
      name: '',
      address: '',
      balance: {},
      gemsAttributes: [],
      isUSDTSpendingAllowed: false,
    }
    this.dispatchState(connectedAccount(payload))
    if (_.isEmpty(accounts)) {
      accounts = await this.web3.eth.getAccounts()
    }
    if (_.isEmpty(accounts)) {
      console.error('Failed to connect to accounts for wallet!')
      return
    }

    const address = _.first(accounts) || ''
    payload.networkId = await this.web3.eth.getChainId()
    payload.type = this.type
    payload.address = address
    payload.name = _.join(
      [..._.slice(address, 0, 6), '...', ..._.slice(address, -6)],
      '',
    )

    // Setting IsFetching true
    this.dispatchState(fetchWalletRequest())
    payload = await this.getWalletDetails(address, payload)

    this.dispatchState(connectedAccount(payload))
    this.dispatchState(allReady(true))

    return true
  }

  getChainName(chainId) {
    return Helpers.getNetworkName(chainId)
  }
}

export default IWalletBase
