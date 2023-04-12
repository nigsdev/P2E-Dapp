export const FETCH_USER_GAMES_REQUEST = 'FETCH_USER_GAMES_REQUEST';
export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS';
export const CREATE_NEW_GAME = 'CREATE_NEW_GAME';
export const UPDATE_ACTIVE_GAME = 'UPDATE_ACTIVE_GAME';
export const END_CURRENT_GAME = 'END_CURRENT_GAME';
export const FETCH_GAMES_ERROR = 'FETCH_GAMES_ERROR';

export function fetchUserGamesRequest() {
  return {
    type: FETCH_USER_GAMES_REQUEST,
  };
}

export const fetchGamesSuccess = (payload) => {
  return {
    type: FETCH_GAMES_SUCCESS,
    payload,
  };
}

export const createNewGame = (payload) => {
  return {
    type: CREATE_NEW_GAME,
    payload,
  };
}

export const updateActiveGame = (payload) => {
  return {
    type: UPDATE_ACTIVE_GAME,
    payload,
  };
}

export const endCurrentGame = () => {
  return {
    type: END_CURRENT_GAME,
  }
}

export function fetchGamesError(payload) {
  return {
    type: FETCH_GAMES_ERROR,
    payload,
  };
}