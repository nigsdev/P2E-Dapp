import { GLOBALS } from '../globals'
import { httpsRequest } from './api-helper'


const getGemsData = {};

getGemsData.AvaiableGemIds = async () => {
  const query = `{ protonNFTs(where: { owner:"${GLOBALS.OWNER_ADDRESS}"}) { tokenId, name } }`;
  const availableGemIds = await httpsRequest.Post(GLOBALS.THE_GRAPH_API_URL, query);
  return availableGemIds.data.protonNFTs
}

getGemsData.UserGemsDetails = async (address) => {
  const query = `{ protonNFTs(where: { owner:"${address}"}) { tokenId, name, attributes { name, value } } }`;
  const userGemIds = await httpsRequest.Post(GLOBALS.THE_GRAPH_API_URL, query);
  return userGemIds.data.protonNFTs;
}

getGemsData.UserGemsBalances = async (tokenIds) => {
  const query = `{ aaveSmartWallets(where: { tokenId_in : [${tokenIds}]}) {
    tokenId
    address
    assetBalances {
      assetToken
      principal
    }
  } }`;
  const userGemsBalances = await httpsRequest.Post(GLOBALS.THE_GRAPH_API_URL, query);
  return userGemsBalances.data.aaveSmartWallets;
}


getGemsData.UserNftTransactions = async (tokenIds) => {
  const query = `{ nftTxHistories(where: { tokenId_in : [${tokenIds}], eventType : "Transfer"}) {
    id
    tokenId
  	timestamp
  	eventType
  	eventData
  } }`;
  const userTransactions = await httpsRequest.Post(GLOBALS.THE_GRAPH_API_URL, query);
  return userTransactions.data.nftTxHistories
}

getGemsData.getUserGemDetails = async (url) => {
  const details = await httpsRequest.Get(url);
  return details;
}

export { getGemsData };