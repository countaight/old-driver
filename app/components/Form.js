
import React, { Component } from 'react';
import {
	Animated,
	Text,
	TextInput,
	TouchableHighlight,
	View
} from 'react-native';

class Form extends Component {
	constructor (props) {
		super(props);
		this.state = {
			email: new Animated.Value(0),
			password: new Animated.Value(0)
		}
	}

	_selectField (field) {
		Animated.timing(
			this.state[field],
			{toValue: 1}
		).start();
	}

	_changeField (field) {
		if (this.props.formFields[field].length === 0) {
			Animated.timing(
			this.state[field],
			{toValue: 0}
		).start();
		}
	}

	_focusNextField (nextField) {
		this.refs[nextField].focus();
	}

	_getStyle (field) {
		return [
			styles.placeholder,
			{
				fontSize: this.state[field].interpolate({
					inputRange: [0, 1],
					outputRange: [16, 12]
				}),
				transform: [{
					translateY: this.state[field].interpolate({
						inputRange: [0, 1],
						outputRange: [30, 0]
					}),
				}],
			}
		]
	}

	_onChange (field, text) {
		this.props.onChangeTxt(field, text);
	}

	_submit () {
		this.props.submitForm(this.props.formFields)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.formContainer}>
					<Text style={styles.text}>
						Login
					</Text>
					<View style={{height: 60}}>
						<Animated.Text style={this._getStyle('email')}>Email</Animated.Text>
						<TextInput
							keyboardType={"email-address"}
							onBlur={this._changeField.bind(this, "email")}
							onChangeText={this._onChange.bind(this, "email")}
							onFocus={this._selectField.bind(this, "email")}
							onSubmitEditing={() => this._focusNextField('2')}
							ref={'1'}
							returnKeyType={'next'} 
							style={styles.input}
						/>
					</View>
					<View style={{height: 60}}>
						<Animated.Text style={this._getStyle('password')}>Password</Animated.Text>
						<TextInput
							onBlur={this._changeField.bind(this, "password")}
							onChangeText={this._onChange.bind(this, "password")}
							onFocus={this._selectField.bind(this, "password")}
							onSubmitEditing={this._submit.bind(this)} 
							ref={'2'} 
							returnKeyType={'done'} 
							secureTextEntry={true} 
							style={styles.input} 
						/>
					</View>
					<TouchableHighlight
						disabled={this.props.formFields.email.length === 0}
						onPress={this._submit.bind(this)}
						style={styles.button}
						underlayColor="#9cc59c"
					>
						<Text style={styles.buttonText}>Log In</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

const styles = {
	button: {
		height: 50,
		width: 250,
		backgroundColor: '#006838',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		fontFamily: 'ReemKufi-Regular',
		color: 'white',
		fontSize: 18,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		opacity: 0.8,
	},
	formContainer: {
		backgroundColor: 'white',
		padding: 10,
		alignItems: 'center',
	},
	input: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 16,
		width: 250,
		height: 40,
	},
	placeholder: {
		paddingLeft: 5,
		fontFamily: 'Montserrat-Regular',
	},
	text: {
		fontSize: 30,
		fontFamily: 'Montserrat-Regular',
		paddingBottom: 20,
	},
}

export default Form