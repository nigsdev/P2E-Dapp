// Frameworks
export const GLOBALS = {};

GLOBALS.CODENAME = 'Supraorbs Casino';
GLOBALS.CODE_VERSION = '0.1.0';
GLOBALS.BASE_URL = 'https://app.supraorbs.com';
GLOBALS.DASHBOARD_ROOT = '/dashboard';

GLOBALS.ETH_UNIT = 1e18;
GLOBALS.ETH_PRECISION = 18;
GLOBALS.NETWORK_TOKEN_NAME = "Matic Token";
GLOBALS.NETWORK_TOKEN_SYMBOL = "MATIC";

GLOBALS.DEPOSIT_FEE_MODIFIER = 1e4;  // 10000  (100%)
GLOBALS.MAX_CUSTOM_DEPOSIT_FEE = 5e3;  // 5000   (50%)
GLOBALS.MIN_DEPOSIT_FEE = 1e6;  // 1000000 (0.000000000001 ETH  or  1000000 WEI)

// Address
GLOBALS.OWNER_ADDRESS = '0x7EbaFa44EC23f8210cA86065A7C54ed5CbF3b9C8';
GLOBALS.EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
GLOBALS.CP_AAVE_WALLET_ID = 'aave';
GLOBALS.CP_CREATOR_ANNUITY = 10000; //100%
GLOBALS.DAI_ALLOWANCE = '44361026545399737308542800';
GLOBALS.USDT_ALLOWANCE = '1000000000000';

//API urls
GLOBALS.THE_GRAPH_API_URL = 'https://api.thegraph.com/subgraphs/name/charged-particles/kovan-universe';
GLOBALS.PRICES_API_URL = 'https://min-api.cryptocompare.com/data/price';

GLOBALS.INFURA_ID = process.env.REACT_APP_ETH_INFURA_ID;
GLOBALS.COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY;
GLOBALS.RPC_URL = process.env.REACT_APP_JSONRPC_URL;
GLOBALS.CHAIN_ID = process.env.REACT_APP_MATIC_CHAIN_ID;
GLOBALS.NETWORK_NAME = process.env.REACT_APP_MATIC_CHAIN_NAME;
GLOBALS.NETWORK_EXPLORER = process.env.REACT_APP_POLYGON_EXPLORER_URL;

GLOBALS.BOOLEAN_TRUE_HEX = '0x0000000000000000000000000000000000000000000000000000000000000001';
GLOBALS.BOOLEAN_FALSE_HEX = '0x0000000000000000000000000000000000000000000000000000000000000000';

GLOBALS.WALLET_TYPE_WALLETCONNECT = 'walletconnect';
GLOBALS.WALLET_TYPE_METAMASK = 'metamask';

GLOBALS.NOTIFICATION_DETAILS = [
    { id: 'welcome', title: 'Successfully Loged In', message: 'You have successfully loggedin in the Supraorbs. Now you can start to explore the dashboard' },
    { id: 'buyGem', title: 'Transaction Successful', message: 'You have successfully gained a Gem.' },
    { id: 'addChips', title: 'Add Chips Successful', message: '' },
    { id: 'withdrawChips', title: 'Withdraw Successful', message: '' },
    { id: 'transactionError', title: 'Transaction Failed', message: 'Something went wrong! Please try again.' },
    { id: 'chooseGem', title: 'Select Gem', message: 'Please choose a avaiable gem to start playing.' },
    { id: 'DAIApprove', title: 'DAI Allowance Success', message: 'You have successfully approved your Gem to spend DAI on your behalf.' },
    { id: 'networkConnectionError', title: 'Something went wrong!', message: 'Please select kovan Test Network' },
    { id: 'USDTApprove', title: 'USDT Allowance Success', message: 'You have successfully approved your Gem to spend USDT on your behalf.' },
];
