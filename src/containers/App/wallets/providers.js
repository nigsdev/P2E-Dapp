// Frameworks

// Internals
import { GLOBALS } from '../../utils/globals';

// Wallets
import MetamaskWallet from './metamask';
import Walletconnect from './walletconnect';

import MetaMaskImage from "../../Pages/ConnectWallet/img/metamask.png";
import WalletConnectImage from "../../Pages/ConnectWallet/img/walletconnect.png";

const WalletProviders = {
    
    [GLOBALS.WALLET_TYPE_METAMASK]      : {
        name: 'MetaMask',
        type: 'native',
        check: 'isMetaMask',
        className: 'metamask',
        wallet: MetamaskWallet,
        logo: MetaMaskImage,
        options: {}
    },
    [GLOBALS.WALLET_TYPE_WALLETCONNECT] : {
        name: 'WalletConnect',
        type: 'qr',
        check: 'isWalletConnect',
        className: 'walletConnect',
        wallet: Walletconnect,
        logo: WalletConnectImage,
        options: {}
    }
};

export { WalletProviders };
