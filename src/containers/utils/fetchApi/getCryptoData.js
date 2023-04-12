import { httpsRequest } from './api-helper'
import { GLOBALS } from '../globals'

const getCryptoData = {};

getCryptoData.ethToUsdPrice = async () => {
  const url = GLOBALS.PRICES_API_URL + '?fsym=ETH&tsyms=USD'
  const ethPrices = await httpsRequest.Get(url);
  return ethPrices.USD;
}

export { getCryptoData };