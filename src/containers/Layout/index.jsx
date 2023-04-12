import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Topbar from './topbar/Topbar'
import { WalletProps } from '../../shared/prop-types/ReducerProps'
import { Helpers } from '../utils/helpers'

const Layout = ({ dispatch, walletState }) => {
  const { isAllReady: isWalletConnected } = walletState

  const walletData = {
    address: walletState.connectedAddress,
    chainId: walletState.networkId,
    walletName: walletState.connectedType,
    shortAddress: walletState.connectedName,
  }

  // useEffect(() => {
  //   let userTokenIds = []
  //   let tokenIdsbyGem = []
  //   let isGemAvailable = false

  //   async function GetTransactionDetails(userTokenIds) {
  //     try {
  //       dispatch(fetchTransactionRequest())
  //       dispatch(await fetchTransactionSuccess(userTokenIds))
  //     } catch (error) {
  //       dispatch(fetchTransactionError({ error }))
  //       console.error(error)
  //     }
  //   }

  //   gemsAttributes.map((gem) => {
  //     //gem.gemDetails
  //     if (gem.gemDetails.length > 0 && userTokenIds.length === 0)
  //       userTokenIds = gem.gemDetails.map((item) => item.tokenId)
  //     else if (gem.gemDetails.length > 0) {
  //       isGemAvailable = true
  //       tokenIdsbyGem = gem.gemDetails.map((item) => item.tokenId)
  //     } else {
  //       isGemAvailable = false
  //       tokenIdsbyGem = []
  //     }
  //     if (isGemAvailable) userTokenIds = userTokenIds.concat(tokenIdsbyGem)
  //   })

  //   GetTransactionDetails(userTokenIds)
  // })

  if (!isWalletConnected) {
    return <Redirect to="" />
  }

  const layoutClass = classNames({
    layout: true,
    'layout--collapse': true,
  })

  const Logout = async () => {
    try {
      await Helpers.disconnectWallet()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={layoutClass}>
      <Topbar data={walletData} logout={Logout} />
    
    </div>
  )
}

Layout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  walletState: WalletProps.isRequired,
}

export default withRouter(
  connect((state) => ({
    rtl: state.rtl,
    walletState: state.walletState,
  }))(Layout),
)
