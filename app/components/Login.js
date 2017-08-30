import React, { Component } from 'react';
import {
	ActivityIndicator,
	Animated,
	Dimensions,
	ImageBackground,
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
			loaded: false
		};
	}

	render() {
		const { fetching, fetched } = this.props.user;

		return (
			<View style={styles.container}>
				<ImageBackground
					onLoad={this._renderForm}
					resizeMode={'cover'}
					source={require('../imgs/backgroundTruck.jpeg')}
					style={styles.image}
				>
					{ fetching || fetched ? <ActivityIndicator size="large" color="#006838"/> : <Form formFields={{email: this.props.user.email, password: this.props.user.password}} onChangeTxt={this.props.onChangeTxt} submitForm={this.props.submitForm} /> }
				</ImageBackground>
			</View>
		)
	}
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
	},
	image: {
		height: '100%'
	},
})

export default Login;