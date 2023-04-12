// Frameworks
import MetaMaskOnboarding from '@metamask/onboarding';
import Web3 from 'web3';

import IWalletBase from './base';
import { GLOBALS } from '../../utils/globals';

class MetamaskWallet extends IWalletBase {
    constructor(siteTitle, siteLogo, dispatch) {
        super(GLOBALS.WALLET_TYPE_METAMASK, siteTitle, siteLogo, dispatch);
    }

    static isEnabled() {
        return MetaMaskOnboarding.isMetaMaskInstalled();
    }

    async prepare({ rpcUrl, chainId }) {
        // Initialize a Web3 Provider object
        this.onboarding = new MetaMaskOnboarding();
        // Detect Injected Web3
        if (!MetamaskWallet.isEnabled()) {
            this.onboarding.startOnboarding();
        }
        // Initialize a Web3 Provider object
        this.provider = window.ethereum;

        // Initialize a Web3 object
        this.web3 = new Web3(this.provider);

        this._hookCommonEvents();

        // Prepare Base
        await super.prepare();
    }

    async connect() {
        await this.validate();
        await this.provider.request({ method: 'eth_requestAccounts' }).then(async (accounts) => {
            await super.changeUserAccount(accounts);

            this.onboarding.stopOnboarding();
        });

        return true;
    }

    async addNetwork() {
        await this.provider.request({
            jsonrpc: "2.0",
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: this.web3.utils.toHex(GLOBALS.CHAIN_ID),
                    chainName: GLOBALS.NETWORK_NAME,
                    rpcUrls: [
                        GLOBALS.RPC_URL
                    ],
                    nativeCurrency: {
                        name: GLOBALS.NETWORK_TOKEN_NAME,
                        symbol: GLOBALS.NETWORK_TOKEN_SYMBOL,
                        decimals: GLOBALS.ETH_PRECISION
                    },
                    blockExplorerUrls: [
                        GLOBALS.NETWORK_EXPLORER
                    ]
                }
            ],
            id: 0
        });
    }

    async switchNetwork() {
        await this.provider.request({
            jsonrpc: "2.0",
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: this.web3.utils.toHex(GLOBALS.CHAIN_ID)
                }
            ],
            id: 0
        });

    }

    async validate() {
        if (this.provider.networkVersion !== GLOBALS.CHAIN_ID) {
            try {
                await this.switchNetwork();
            } catch (error) {
                if (error.code === 4902) {
                    await this.addNetwork().then(async () => {
                        await this.switchNetwork();
                    })
                }
                else {
                    throw new Error('Something went wrong!')
                }
            }

        }
    }

    async update(address) {
        await super.update(address)
    }

    _hookCommonEvents() {
        this.provider.on("accountsChanged", this.connect);
        this.provider.on("networkChanged", this.connect);
    }
}

export default MetamaskWallet;
