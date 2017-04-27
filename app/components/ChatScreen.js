import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class ChatScreen extends Component {
	static navigationOptions = {
		tabBarLabel: 'Chat',
		tabBarIcon: ({ tintColor }) => {
			return (
				<Icon name='chat' color={tintColor} />
			)
		},
	}

	render () {
		return (
			<View style={styles.container}>
				<Text>Chat Goes Here</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
})