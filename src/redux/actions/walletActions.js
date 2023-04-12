export const ALL_READY = "ALL_READY";
export const CONNECTED_ACCOUNT = "CONNECTED_ACCOUNT";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const LOGOUT = "LOGOUT";
export const FETCH_WALLET_REQUEST = "FETCH_WALLET_REQUEST";

export function allReady(payload) {
  return {
    type: ALL_READY,
    payload,
  };
}

export function connectedAccount(payload) {
  return {
    type: CONNECTED_ACCOUNT,
    payload,
  };
}

export function updateAccount(payload) {
  return {
    type: UPDATE_ACCOUNT,
    payload,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function fetchWalletRequest() {
  return {
    type: FETCH_WALLET_REQUEST,
  };
}
