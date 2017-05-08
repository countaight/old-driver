import { connect } from 'react-redux';

const mapStateToProps =
	state => ({
		connectionState: state.connection.get('state'),
		failureTrace: state.connection.get('error'),
	});

const mapDispatchToProps =
	dispatch => ({
		connect:
			() => connectionActions.connect()(dispatch),
		failure:
			error => dispatch(connectionActions.failure()),
	})

class ChatContainer extends Component {
	componentDidMount () {
		this.props.connect();
	}

	render () {
		const {connectionState, failureTrace} = this.props;

		switch (connectionState) {
			case ConnectionState.Idle:
				return null;
			case ConnectionState.Connecting:
				return (
					<ActivityIndicator
						animating={true}
						size='large'
					/>
				);
			case ConnectionState.Connected:
				return <Conversation />;
			case Connection.Failed:
				return (
					<View>
						<Text>Failed to connect, reconnecting in 1s</Text>
						<View>
							<Text>{failureTrace}</Text>
						</View>
					</View>
				)
		}
	}
};

export default Container = connect(mapStateToProps, mapDispatchToProps)(ChatContainer);