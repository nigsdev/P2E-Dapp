import { GLOBALS } from '../globals'
import { httpsRequest } from './api-helper'


const getUserWalletDetails = {};

const covalentUri = `https://api.covalenthq.com/v1/${GLOBALS.CHAIN_ID}/address/`

getUserWalletDetails.walletDetails = async (address) => {
  // console.log('GLOBALS.COVALENT_API_KEY', GLOBALS.COVALENT_KEY, GLOBALS.CHAIN_ID);
  const url = `${covalentUri +
    address}/balances_v2/?nft=true&key=ckey_2f68f1fc3e374e3a8a1a5a129e9`
  const response = await httpsRequest
    .Get(url)
    .then(apiResponse => apiResponse)
    .catch(error => error)
  return response.data
}


export { getUserWalletDetails };