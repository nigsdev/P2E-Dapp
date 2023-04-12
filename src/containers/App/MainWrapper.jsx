import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ThemeProps, RTLProps, WalletProps } from '../../shared/prop-types/ReducerProps';

// Custom Styles
import Wallet from './wallets';
import { Usdt, Gem, ChargedState, SupraorbsCasino } from '../../blockchain/contracts';
import GemData from '../../blockchain/contracts/Gem.json';
import UsdtData from '../../blockchain/contracts/USDT.json';
import ChargedStateData from '../../blockchain/contracts/ChargedState.json';
import SupraorbsCasinoData from '../../blockchain/contracts/SupraorbsCasino.json';


const MainWrapper = ({ dispatch, theme, children, rtl, location, walletState }) => {
  const direction = location.pathname === '/' ? 'ltr' : rtl.direction;
  const wallet = Wallet.instance();
  const { isAllReady: isWalletReady, networkId } = walletState;

  // Prepare Wallet Interface
  useEffect(() => {
    wallet.init({
      walletDispatch: dispatch,
      siteTitle: 'Supraorbs Casino',
      siteLogoUrl: "https://www.supraorbs.com/img/Supraorbs%20icon.png"
    });
  }, [wallet, dispatch]);

  // Reconnect to Contracts on network change
  useEffect(() => {
    if (isWalletReady) {
      const web3 = wallet.getWeb3();

      Gem.prepare({ web3, address: GemData.address });
      Gem.instance();

      // ChargedParticles.prepare({ web3, address: ChargedParticlesData.address });
      // ChargedParticles.instance();

      Usdt.prepare({ web3, address: UsdtData.address });
      Usdt.instance();

      SupraorbsCasino.prepare({ web3, address: SupraorbsCasinoData.address });
      SupraorbsCasino.instance();

      ChargedState.prepare({ web3, address: ChargedStateData.address });
      ChargedState.instance();
    }
  }, [isWalletReady, networkId, wallet]);


  return (
    <div className={`${theme.className} ${direction}-support`} dir={direction}>
      <div className="wrapper">
        {children}
      </div>
    </div>
  );
};

MainWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  theme: ThemeProps.isRequired,
  rtl: RTLProps.isRequired,
  walletState: WalletProps.isRequired,
  children: PropTypes.element.isRequired,
  location: PropTypes.shape().isRequired,
};

export default withRouter(connect((state) => ({
  theme: state.theme,
  rtl: state.rtl,
  walletState: state.walletState
}))(MainWrapper));
