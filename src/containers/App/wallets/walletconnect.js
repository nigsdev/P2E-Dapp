// Frameworks
import Web3 from 'web3';
import WalletConnect from "@walletconnect/client";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from '@walletconnect/web3-provider';

import IWalletBase from './base';
import { GLOBALS } from '../../utils/globals';

class WalletConnectWallet extends IWalletBase {
    constructor(siteTitle, siteLogo, dispatch) {
        super(GLOBALS.WALLET_TYPE_WALLETCONNECT, siteTitle, siteLogo, dispatch);
    }

    async prepare({ rpcUrl, chainId }) {
        // Initialize WalletConnect
        this.walletConnector = new WalletConnect({
            bridge: 'https://bridge.walletconnect.org'
        });

        let bridge = 'https://bridge.walletconnect.org';
        // let infuraId = GLOBALS.INFURA_ID;
        let qrcode = true;

        this.provider = new WalletConnectProvider({
            bridge,
            rpc: {
                80001: rpcUrl,
            },
            qrcode,
            chainId,
        });

        this.web3 = new Web3(this.provider);

        //await this.connect();
        this.hookCustomEvents();
        super.prepare();
    }

    async connect() {
        await this.validate();
        if (!this.walletConnector.connected) {
            // create new session
            await this.walletConnector.createSession();
        }

        await this.provider.enable();
        return await super.connect();
    }

    async validate() {
        console.log('Validate walletConnect');
    }

    async disconnect() {
        // Disconnect WalletConnect
        await this.provider.close();

        // Disconnect Base
        await super.disconnect();

    }

    hookCustomEvents() {
        this.walletConnector.on('connect', async (error, payload) => {
            if (error) { throw error; }

            // Close QR Code Modal
            WalletConnectQRCodeModal.close();

            // Get provided accounts and chainId
            const { accounts } = payload.params[0];
            await super.connect(accounts);
        });

        this.walletConnector.on('session_update', async (error, payload) => {
            if (error) { throw error; }
            console.log('walletConnector session_update');
            const { accounts } = payload.params[0];
            await super.connect(accounts);
        });

        this.walletConnector.on('disconnect', async (error, payload) => {
            if (error) { throw error; }
            console.log('walletConnector disconnect');
            delete this.walletConnector;
            await super.disconnect();
        });

        this.provider.on('close', async (code, reason) => {
            console.log('wallet-connect closed');
            console.log('code', code);
            console.log('reason', reason);
            //await this.disconnect();
        });

        this.provider.on("accountsChanged", async (error, payload) => {
            if (error) { throw error; }
            console.log('walletConnector accountsChanged');
            const { accounts } = payload.params[0];
            await super.connect(accounts);
        });
        this.provider.on("networkChanged", async (error, payload) => {
            if (error) { throw error; }
            console.log('walletConnector networkChanged');
            this.validate();
            const { accounts } = payload.params[0];
            await super.connect(accounts);
        });
    }
}

export default WalletConnectWallet;
