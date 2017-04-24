import React, { Component } from 'react';
import {
	ActivityIndicator,
	Animated,
	Image,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

import Form from './Form';
import TappableRow from './TappableRow';

class Home extends Component {
	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome to the Noel Transportation App. Stay on the Locator tab to send location.</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	title: {
		marginBottom: 20,
		fontSize: 22,
		textAlign: 'center',
	},
	container: {
		flex: 1,
		paddingTop: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		height: 616,
		justifyContent: 'center',
	},
	welcome: {
		textAlign: 'center',
		fontSize: 16,
		width: 300,
		fontFamily: 'Montserrat-Regular'
	}
})

export default Home;