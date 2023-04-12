import { httpsRequest } from './api-helper'
import { GLOBALS } from '../globals'

const getUserGamesData = {};

getUserGamesData.history = async () => {
  const url = GLOBALS.PRICES_API_URL + '?fsym=ETH&tsyms=USD'
  const response = await httpsRequest.Get(url);
  return response.data;
}

export { getUserGamesData };