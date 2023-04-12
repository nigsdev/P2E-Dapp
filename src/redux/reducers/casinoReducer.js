import {
  FETCH_USER_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS,
  CREATE_NEW_GAME,
  UPDATE_ACTIVE_GAME,
  END_CURRENT_GAME,
  FETCH_GAMES_ERROR,
} from '../actions/casinoActions'

const defaultState = {
  activeGame: [],
  isFetching: false,
  error: null,
}

const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_USER_GAMES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case FETCH_GAMES_SUCCESS: {
      return {
        ...state,
        activeGame: action.payload,
        isFetching: false,
        error: null,
      }
    }
    case CREATE_NEW_GAME: {
      return {
        ...state,
        activeGame: action.payload,
      }
    }

    case UPDATE_ACTIVE_GAME: {
      return {
        ...state,
        activeGame: action.payload,
      }
    }
    case END_CURRENT_GAME: {
      return {
        ...state,
        activeGame: [],
        isFetching: false,
        error: null,
      }
    }
    case FETCH_GAMES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default gameReducer
