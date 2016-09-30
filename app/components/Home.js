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
	constructor (props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(0),
			loaded: false
		}
	}

	_getStyle () {
		return [
			styles.image,
			{
				opacity: this.state.fadeAnim,
			}
		]
	}

	_renderForm () {
		Animated.timing(
			this.state.fadeAnim,
			{toValue: 1}
		).start();
	}

	render () {
		const { fetched, fetching } = this.props.user;

		if (fetched === false && fetching === true) {
			var view = <ActivityIndicator size="large" animating={true} />
		} else if (fetched === true && fetching === false) {
			var view = <Text style={styles.welcome}>Welcome to the Noel Transportation App. Stay on the Locator tab to send location.</Text>
		} else {
			var view = 
				<Animated.Image
					onLoad={this._renderForm.bind(this)}
					resizeMode={'contain'}
					source={require('../imgs/backgroundTruck.jpeg')}
					style={this._getStyle()}
				>
					<Form formFields={{email: this.props.user.email, password: this.props.user.password}} onChangeTxt={this.props.onChangeTxt} submitForm={this.props.submitForm} />
				</Animated.Image>
		};
		
		return (
			<View style={styles.container}>
				{ view }
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
		fontSize: 16,
		width: 300,
		fontFamily: 'Montserrat-Regular'
	}
})

export default Home;