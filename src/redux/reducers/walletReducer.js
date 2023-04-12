import {
  ALL_READY,
  CONNECTED_ACCOUNT,
  UPDATE_ACCOUNT,
  LOGOUT,
  FETCH_WALLET_REQUEST
} from '../actions/walletActions';

const defaultState = {
  networkId: 0,
  isAllReady: false,
  isUSDTSpendingAllowed: false,
  connectedType: '',
  connectedAddress: '',
  connectedName: '',
  connectedBalance: {},
  gemsAttributes: [],
  isFetching: false,
};


const walletReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ALL_READY: {
      return {
        ...state,
        isAllReady: action.payload
      };
    }
    case CONNECTED_ACCOUNT: {
      return {
        ...state,
        networkId: action.payload.networkId,
        isUSDTSpendingAllowed: action.payload.isUSDTSpendingAllowed,
        connectedType: action.payload.type,
        connectedAddress: action.payload.address,
        connectedName: action.payload.name,
        connectedBalance: action.payload.balance,
        gemsAttributes: action.payload.gemsAttributes,
        isFetching: false,
      };
    }
    case UPDATE_ACCOUNT: {
      return {
        ...state,
        isUSDTSpendingAllowed: action.payload.isUSDTSpendingAllowed,
        connectedBalance: action.payload.balance,
        gemsAttributes: action.payload.gemsAttributes,
        isFetching: false,
      };
    }
    case LOGOUT:
      return {
        ...state,
        isAllReady: false,
        isUSDTSpendingAllowed: false,
        networkId: 0,
        connectedType: '',
        connectedAddress: '',
        connectedName: '',
        connectedBalance: {},
        isFetching: false,
      };

    case FETCH_WALLET_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    default:
      return state;
  }
};

export default walletReducer;
