import {
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_ERROR
} from '../actions/transactionActions';

const defaultState = {
  data: [],
  isFetching: false,
  error: null,
};


const transactionReducer = (state = defaultState, action) => {
switch (action.type) {
  case FETCH_TRANSACTION_REQUEST: {
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  }
  case FETCH_TRANSACTION_SUCCESS: {
    return {
      ...state,
      data: action.payload,
      isFetching: false,
      error: null,
    };
  }
  case FETCH_TRANSACTION_ERROR:
    return {
      ...state,
      isFetching: false,
      error: action.payload,
    };
  default:
    return state;
}
};

export default transactionReducer;
