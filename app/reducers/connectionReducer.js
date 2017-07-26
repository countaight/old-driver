import { fromJS } from 'immutable';

import {
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
} from '../actions';

import { ConnectionState } from '../constants';

export const initialState = fromJS({
  state: ConnectionState.Idle, // connection state
  error: null,                 // failure exception
});

export const connectionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CONNECTING:
      return state.merge({ state: ConnectionState.Connecting });

    case CONNECTED:
      return state.merge({ state: ConnectionState.Connected });

    case DISCONNECTED:
      if (payload.error) {
        return state.merge({
          state: ConnectionState.Failed,
          error: payload.error.stack,
        });
      }
      else {
        return state.merge({ state: ConnectionState.Idle });
      }

    default:
      return state;
  }
};