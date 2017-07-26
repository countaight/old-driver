import { connect, disconnect } from '../services/pubnub';

export const CONNECTING = 'CONNECT';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';

export const connectionActions = {
	connect(uuid) {
		return dispatch => {
			dispatch({type: CONNECTING});

			return connect(uuid)
				.then(({ uuid }) => {
					dispatch({ type: CONNECTED, payload: uuid });
				})
				.catch(error => {
					dispatch({ type: DISCONNECTED, payload: {error} });

					const reconnect = (uuid) => connectionActions.connect(uuid)(dispatch);

					setTimeout(reconnect, 1500);
				});
		};
	},

	disconnect() {
		return dispatch => {
			disconnect().then(() => dispatch({ type: DISCONNECTED, payload: {} }));
		};
	},

	failure(error) {
		return { type: DISCONNECTED, payload: {error}};
	}
};