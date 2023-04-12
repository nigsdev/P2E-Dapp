import { getGemsData } from '../../containers/utils/fetchApi/getGemsData'

export const FETCH_TRANSACTION_REQUEST = 'FETCH_TRANSACTION_REQUEST';
export const FETCH_TRANSACTION_SUCCESS = 'FETCH_TRANSACTION_SUCCESS';
export const FETCH_TRANSACTION_ERROR = 'FETCH_TRANSACTION_ERROR';

export function fetchTransactionRequest() {
    return {
      type: FETCH_TRANSACTION_REQUEST,
    };
}

export const fetchTransactionSuccess = async (tokenIds) => {
    let payload = [];

    //Fetch Transaction data
    const transactionData = await getGemsData.UserNftTransactions(tokenIds)

    payload = transactionData.map(transaction => {
      return {
        transactionHash: transaction.id.split('-')[2], 
        eventName: transaction.eventType,
        transactionDate: transaction.timestamp,
        tokenId: transaction.tokenId
      }
    })
    
    return {
      type: FETCH_TRANSACTION_SUCCESS,
      payload,
    };
}

export function fetchTransactionError(payload) {
    return {
      type: FETCH_TRANSACTION_ERROR,
      payload,
    };
}