import {
  CONNECTION_STATE,
  CONNECTED_NETWORK,
  DISCONNECTED_NETWORK
} from '../actions/rootActions';


const defaultState = {
    networkId: 0,
    isNetworkConnected: false,
    networkErrors: [],
    connectionState: {},

    errors: null
};


const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CONNECTION_STATE: {
      return {
        ...state,
        connectionState: action.payload
      };
    }
    case CONNECTED_NETWORK: {
      return {
        ...state,
        networkId          : action.payload.networkId,
        isNetworkConnected : action.payload.isNetworkConnected,
        networkErrors      : action.payload.networkErrors,
      };
    }
    case DISCONNECTED_NETWORK:
      return {            
        ...state,
        isNetworkConnected : action.payload.isNetworkConnected,
        networkErrors      : action.payload.networkErrors,
      };
    default:
      return state;
  }
};

export default rootReducer;

