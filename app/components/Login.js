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

class Login extends Component {
	constructor (props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(0),
			loaded: false
		};

		this._renderForm = this._renderForm.bind(this);
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

	render() {
		const { fetching } = this.props.user
		return (
			<View style={styles.container}>
				<Animated.Image
					onLoad={this._renderForm}
					resizeMode={'contain'}
					source={require('../imgs/backgroundTruck.jpeg')}
					style={this._getStyle()}
				>
					{ fetching ? <ActivityIndicator /> : <Form formFields={{email: this.props.user.email, password: this.props.user.password}} onChangeTxt={this.props.onChangeTxt} submitForm={this.props.submitForm} /> }
				</Animated.Image>
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
	image: {
		height: '100%',
		justifyContent: 'center',
	},
})

export default Login;