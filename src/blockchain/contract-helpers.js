// App Components
import IPFS from '../containers/utils/ipfs'

// Contract Data
import {
  Usdt,
  Gem,
  SupraorbsCasino,
  ChargedState,
} from '../blockchain/contracts'

import { GLOBALS } from '../containers/utils/globals'
import GemData from '../blockchain/contracts/Gem.json'
import SupraorbsCasinoData from '../blockchain/contracts/SupraorbsCasino.json'

const gemMetadata = {
  description: '',
  external_url: '',
  image: '',
  name: '',
  symbol: '',
  properties: { about: '' },
  attributes: [{ name: 'Casino Chips', value: '0' }],
}

const ContractHelpers = {}

ContractHelpers.saveMetadata = ({ gemData, setLoadingProgress }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Generate Token Metadata
      const metadata = { ...gemMetadata }
      metadata.name = gemData.name
      metadata.symbol = gemData.symbol
      metadata.description = gemData.description
      metadata.external_url = gemData.externalUrl
      metadata.image = gemData.externalUrl
      metadata.attributes = gemData.gameAssets
      metadata.properties.about = gemData.about

      // Save Metadata to IPFS
      setLoadingProgress('Saving Metadata to IPFS..')
      const jsonFileUrl = await IPFS.saveJsonFile({ jsonObj: metadata })

      resolve({ jsonFileUrl })
    } catch (err) {
      reject(err)
    }
  })
}

ContractHelpers.buyGem = ({ from, gemData, setLoadingProgress }) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Saving details to IPFS
      const { jsonFileUrl } = await ContractHelpers.saveMetadata({
        gemData,
        setLoadingProgress,
      })

      // Buy Gem
      setLoadingProgress('Executing transfer on Blokchain')
      const gem = Gem.instance()
      const usdt = Usdt.instance()
      const args = [
        gemData.creator,
        from,
        jsonFileUrl,
        GLOBALS.CP_AAVE_WALLET_ID,
        usdt.getAddress(),
        gemData.weiPrice,
      ]
      const txData = await usdt.contract.methods.transfer(
        gem.getAddress(),
        gemData.weiPrice,
      )
      const tx = {
        from,
        data: txData.encodeABI(),
      }

      // // Submit Transaction and wait for Receipt
      gem.sendContractTx('mintGem', tx, args, async (err, transactionHash) => {
        if (err) {
          return reject(err)
        }
        const txReceipt = await gem.getTransactionReceipt(transactionHash)
        resolve({ tx, args, transactionHash, txReceipt })
      })
    } catch (err) {
      reject(err)
    }
  })
}

// Adding Chips to Gem
ContractHelpers.addChips = ({
  from,
  tokenId,
  chipsAmount,
  setLoadingProgress,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create Gem on Blockchain
      setLoadingProgress('Updating Gem On Blockchain')
      const gem = Gem.instance()
      const usdt = Usdt.instance()
      // const chipsAmountInWei = Helpers.toWei(chipsAmount);
      console.log('chipsAmount', chipsAmount)
      const chips = chipsAmount * 1000000
      console.log('chips', chips)
      const gemAddress = gem.getAddress()

      const txData = await usdt.contract.methods.transfer(gemAddress, chips)
      const tx = {
        from,
        data: txData.encodeABI(),
      }

      const args = [
        tokenId,
        GLOBALS.CP_AAVE_WALLET_ID,
        usdt.getAddress(),
        chips,
      ]

      // // Submit Transaction and wait for Receipt
      gem.sendContractTx(
        'addCasinoCoins',
        tx,
        args,
        async (err, transactionHash) => {
          if (err) {
            console.error(err)
            return reject(err)
          }
          const txReceipt = await gem.getTransactionReceipt(transactionHash)
          resolve({ tx, args, transactionHash, txReceipt })
        },
      )
    } catch (err) {
      reject(err)
    }
  })
}

// Release Chips from Gem
ContractHelpers.withdrawChips = ({
  from,
  tokenId,
  chipsAmount,
  setLoadingProgress,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      setLoadingProgress('Updating Gem On Blockchain')
      const gem = Gem.instance()
      const usdt = Usdt.instance()
      // const chipsAmountInWei = Helpers.toWei(chipsAmount);
      const chips = chipsAmount * 1000000
      const tx = {
        from,
      }

      const args = [
        from,
        tokenId,
        GLOBALS.CP_AAVE_WALLET_ID,
        usdt.getAddress(),
        chips,
      ]

      // // Submit Transaction and wait for Receipt
      gem.sendContractTx(
        'withdrawCasinoCoins',
        tx,
        args,
        async (err, transactionHash) => {
          if (err) {
            console.error(err)
            return reject(err)
          }
          const txReceipt = await gem.getTransactionReceipt(transactionHash)
          resolve({ tx, args, transactionHash, txReceipt })
        },
      )
    } catch (err) {
      reject(err)
    }
  })
}

// Approving USDT Spending
ContractHelpers.allowUsdtSpending = ({ from, setLoadingProgress }) => {
  return new Promise(async (resolve, reject) => {
    try {
      setLoadingProgress('You will be able to add chips once this is approved.')
      const gem = Gem.instance()
      const usdt = Usdt.instance()
      const gemAddress = gem.getAddress()
      const usdtTx = {
        from,
      }
      const usdtArgs = [gemAddress, GLOBALS.USDT_ALLOWANCE]

      await usdt.sendContractTx(
        'approve',
        usdtTx,
        usdtArgs,
        async (err, transactionHash) => {
          if (err) {
            console.error(err)
            return reject(err)
          }
          const txReceipt = await gem.getTransactionReceipt(transactionHash)
          resolve({ usdtTx, usdtArgs, transactionHash, txReceipt })
        },
      )
    } catch (err) {
      reject(err)
    }
  })
}

ContractHelpers.setApprovalForAll = (tokenId, from, setLoadingProgress) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create Gem on Blockchain
      setLoadingProgress('Updating Gem On Blockchain')
      const chargedState = ChargedState.instance()

      const tx = {
        from,
      }

      const args = [GemData.address, tokenId, SupraorbsCasinoData.address]

      // // Submit Transaction and wait for Receipt
      chargedState.sendContractTx(
        'setApprovalForAll',
        tx,
        args,
        async (err, transactionHash) => {
          if (err) {
            console.error(err)
            return reject(err)
          }
          const txReceipt = await chargedState.getTransactionReceipt(
            transactionHash,
          )
          resolve({ tx, args, transactionHash, txReceipt })
        },
      )
    } catch (err) {
      reject(err)
    }
  })
}

// SlotMachime Game
ContractHelpers.enterSlotMachineOrb = ({ tokenId, from }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create Gem on Blockchain
      // setLoadingProgress("Updating Gem On Blockchain")

      const gem = Gem.instance()
      const supraorbsCasino = SupraorbsCasino.instance()
      const usdt = Usdt.instance()
      const usdtAddress = usdt.getAddress()

      const tx = {
        from,
      }

      const args = [tokenId, GLOBALS.CP_AAVE_WALLET_ID, usdtAddress]

      console.log('args', args, tx)

      // // Submit Transaction and wait for Receipt
      supraorbsCasino.sendContractTx(
        'enterSlotMachineOrb',
        tx,
        args,
        async (err, transactionHash) => {
          if (err) {
            console.error(err)
            return reject(err)
          }
          const txReceipt = await gem.getTransactionReceipt(transactionHash)
          resolve({ args, transactionHash, txReceipt })
        },
      )
    } catch (err) {
      reject(err)
    }
  })
}

ContractHelpers.exitSlotMachineOrb = ({ tokenId, from, currentBalance }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create Gem on Blockchain
      // setLoadingProgress("Updating Gem On Blockchain")
      // const gem = Gem.instance();
      const supraorbsCasino = SupraorbsCasino.instance()
      const usdt = Usdt.instance()
      const usdtAddress = usdt.getAddress()

      const tx = {
        from,
      }

      const args = [
        tokenId,
        GLOBALS.CP_AAVE_WALLET_ID,
        Number(currentBalance) * 1000000,
        usdtAddress,
      ]

      // // Submit Transaction and wait for Receipt
      supraorbsCasino.sendContractTx(
        'exitSlotMachineOrb',
        tx,
        args,
        async (err, transactionHash) => {
          if (err) {
            console.error(err)
            return reject(err)
          }
          const txReceipt = await supraorbsCasino.getTransactionReceipt(
            transactionHash,
          )

          resolve({ args, transactionHash, txReceipt })
        },
      )
    } catch (err) {
      reject(err)
    }
  })
}

// Get Slot Machine Orb of Gem
ContractHelpers.getSlotMachineOrb = async (tokenId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const supraorbsCasino = SupraorbsCasino.instance()
      const args = [tokenId]

      const res = supraorbsCasino.callContractFn('getSlotMachineOrb', args)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// Is Gem Approved For Release
ContractHelpers.isApprovedForRelease = async (tokenId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chargedState = ChargedState.instance()
      const args = [GemData.address, tokenId, SupraorbsCasinoData.address]

      const res = chargedState.callContractFn('isApprovedForRelease', args)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// Is Gem Approved For Timelock
ContractHelpers.isApprovedForTimelock = async (tokenId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chargedState = ChargedState.instance()
      const args = [GemData.address, tokenId, SupraorbsCasinoData.address]

      const res = chargedState.callContractFn('isApprovedForTimelock', args)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

export { ContractHelpers, gemMetadata }
