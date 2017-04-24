import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

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
	container: {
		flex: 1,
		paddingTop: 0,
		alignItems: 'center',
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