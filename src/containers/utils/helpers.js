// Frameworks
import * as _ from 'lodash';

// App Components
import Wallet from '../App/wallets';
import { getCryptoData } from './fetchApi/getCryptoData';
import USDTData from '../../../src/blockchain/contracts/USDT.json';
import GemData from '../../../src/blockchain/contracts/Gem.json';
export const Helpers = {};

Helpers.now = () => {
    return (new Date()).getTime();
};

// Helpers.getFriendlyPrice = (tokenType, isNft) => {
//     tokenType = _.toUpper(tokenType);
//     const pricing = GLOBALS.CREATE_PARTICLE_PRICE[tokenType];
//     if (_.isUndefined(pricing)) { return false; }
//     const weiPrice = _.parseInt(pricing[isNft ? 'NFT' : 'FT'], 10);
//     return `${weiPrice / GLOBALS.ETH_UNIT}`;
// };

Helpers.getBlockieOptions = (walletData, opts = {}) => {
    const defaultOptions = {
        size: 15,
        scale: 2,
        seed: walletData.connectedAddress,
        color: `#${walletData.connectedAddress.slice(2, 8)}`,
        bgcolor: `#${walletData.connectedAddress.slice(12, 18)}`,
        spotcolor: `#${walletData.connectedAddress.slice(22, 28)}`,
    };
    return { ...defaultOptions, ...opts };
};

Helpers.getNetworkName = (networkId) => {
    switch (_.parseInt(networkId, 10)) {
        case 1:
            return 'mainnet';
        case 3:
            return 'ropsten';
        case 42:
            return 'kovan';
        case 80001:
            return 'mumbai';
        default:
            return 'development';
    }
};

Helpers.toEther = (str) => {
    const wallet = Wallet.instance();
    return wallet.getWeb3().utils.fromWei(str, 'ether');
};

Helpers.toWei = (str) => {
    const wallet = Wallet.instance();
    return wallet.getWeb3().utils.toWei(str, 'ether');
};

Helpers.toAscii = (str) => {
    const wallet = Wallet.instance();
    return wallet.getWeb3().utils.hexToAscii(str);
};

Helpers.toBytes16 = (str) => {
    const wallet = Wallet.instance();
    return wallet.getWeb3().utils.utf8ToHex(str);
};

// Helpers.decodeLog = ({eventName, logEntry}) => {
//     const wallet = Wallet.instance();
//     const eventData = _.find(ChargedParticlesData.abi, {type: 'event', name: eventName});
//     const eventAbi = _.get(eventData, 'inputs', []);
//     if (_.isEmpty(eventAbi)) { return false; }
//     return wallet.getWeb3().eth.abi.decodeLog(eventAbi, logEntry.data, logEntry.topics.slice(1));
// };

Helpers.getAssetBalance = async (connectedAddress, abi, tokenAddress) => {
    const wallet = Wallet.instance();
    const web3 = wallet.getWeb3()
    const Contract = new web3.eth.Contract(abi, tokenAddress)
    return await Contract.methods.balanceOf(connectedAddress).call()
}


Helpers.updateWallet = async (address) => {
    const wallet = Wallet.instance();
    return await wallet.update(address);
}

Helpers.disconnectWallet = async () => {
    const wallet = Wallet.instance();
    return await wallet.disconnect();
}

Helpers.checkAssetAllowance = async (connectedAddress, spenderAddress, abi, tokenAddress) => {
    const wallet = Wallet.instance();
    const web3 = wallet.getWeb3();
    const Contract = new web3.eth.Contract(abi, tokenAddress)
    return await Contract.methods.allowance(connectedAddress, spenderAddress).call();
}

Helpers.formatEtherscanLink = (chainId, address, type = 'account') => {
    const networkName = Helpers.getNetworkName(chainId)
    switch (type) {
        // eslint-disable-next-line no-lone-blocks
        case 'account': {
            return `https://${networkName}.polygonscan.com/address/${address}`;
        };
        // eslint-disable-next-line no-lone-blocks
        case 'transaction': {
            return `https://${networkName}.polygonscan.com/tx/${address}`;
        };
        default:
            return '';
    }

}

Helpers.formatEtherPriceToUSD = async () => {
    const ethUsdPrice = await getCryptoData.ethToUsdPrice();
    return ethUsdPrice;
}

Helpers.userChipsBalance = async (tokenId) => {
    const wallet = Wallet.instance();
    const web3 = wallet.getWeb3()
    const Contract = new web3.eth.Contract(GemData.abi, GemData.address)
    return await Contract.methods.getCasinoChipsBalance(tokenId, "aave", USDTData.address).call();
}






