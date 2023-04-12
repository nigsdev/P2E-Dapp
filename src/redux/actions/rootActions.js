export const CONNECTION_STATE = 'CONNECTION_STATE';
export const CONNECTED_NETWORK = 'CONNECTED_NETWORK';
export const DISCONNECTED_NETWORK = 'DISCONNECTED_NETWORK';

export function connectionState(payload) {
    return {
      type: CONNECTION_STATE,
      payload,
    };
  }

export function connectedNetwork(payload) {
    return {
      type: CONNECTED_NETWORK,
      payload,
    };
  }

export function disconnectedNetwork(payload) {
    return {
      type: DISCONNECTED_NETWORK,
      payload,
    };
  }