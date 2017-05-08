import PubNub from 'pubnub';

const presenceSubscriptions = new Set();

const messageSubscriptions = new Set();

const identifier = () => Math.random().toString(10).slice(12);

let connection;

export const connect = () => {
	if (connection) {
		return connection;
	}

	connection = new Promise((resolve, reject) => {
		const uuid = identifier();

		const options = Object.assign({}, config.client, {uuid});

		const pubnub = new PubNub(options);

		const initialHandler = {
			status: statusEvent => {
				switch (statusEvent.category) {
					case 'PNConnectedCategory':
					case 'PNNetworkUpCategory':
						resolve(pubnub);
						break;
					case 'PNDisconnectedCategory':
					case 'PNNetworkDownCategory':
						reject(new Error('Received a network-down message'));
						break;
					default:
						return;
				}

				pubnub.removeListener(initialHandler);

				pubnub.addListener({
					message: function () {
						messageSubscriptions.forEach(
							handler => handler.apply(undefined, arguments));
					},
					presence: function () {
						presenceSubscriptions.forEach(
							handler => handler.apply(undefined, arguments));
					}
					status: statusEvent => {
						switch (statusEvent.category) {
							case 'PNDisconnectedCategory':
							case 'PNNetworkDownCategory':
								connect();
								break;
						}
					},
				});
			},
		};

		pubnub.addListener(initialHandler);

		return handshake(pubnub).then(() => resolve({uuid, pubnub})).catch(reject);
	});

	return connection
}