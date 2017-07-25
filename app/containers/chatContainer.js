import React, {Component, PropTypes} from 'react';
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableHighlight,
  View,
  Linking
} from 'react-native';
import { Icon } from 'react-native-elements';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { connectionActions } from '../actions';
import { ConnectionState, config } from '../constants';
import { Conversation } from '../components/ChatScreen';

import styles from '../styles';

const getConnection = state => {
	return {
		connectionState: state.connection.get('state'),
		failureTrace: state.connection.get('error')
	};
};

const makeGetConnectionState = () => createSelector(
	getConnection,
	connection => connection
	)

const makeMapStateToProps = () => {
	const getConnectionState = makeGetConnectionState();
	return (state, props) => getConnectionState(state, props);
}

const mapDispatchToProps =
	dispatch => ({
		connect:
			() => connectionActions.connect()(dispatch),
		failure:
			error => dispatch(connectionActions.failure()),
	})

class ChatContainer extends Component {
	static navigationOptions = {
		tabBarLabel: 'Chat',
		tabBarIcon: ({ tintColor }) => {
			return (
				<Icon name='chat' color={tintColor} />
			)
		},
	}

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
			case ConnectionState.Failed:
				return (
          <View style={styles.m3}>
            <Text>Failed to connect, reconnecting in 1s</Text>
            <View style={styles.p1}>
              <Text style={styles.stackTrace}>{failureTrace}</Text>
            </View>
          </View>
        );
		}
	}
};

export default Container = connect(makeMapStateToProps, mapDispatchToProps)(ChatContainer);