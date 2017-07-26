import React, { Component } from 'react';
import {
	Animated,
	Text,
	TextInput,
	TouchableHighlight,
	View
} from 'react-native';
import { Field, reduxForm } from 'redux-form';

class myTextField extends Component {
	render () {
		const { input, ...inputProps } = this.props;
		const { error, touched } = inputProps.meta;
		return (
			<View>
				<TextInput
					ref={input.name}
					{...inputProps}
					onBlur={() => inputProps._blurField(input.name, input.value)}
					onChange={input.onChange}
					onFocus={() => inputProps._selectField(input.name)}
					value={input.value}
				/>
				{ touched && error && <Text>{error}</Text> }
			</View>
		);
	}
}

class Form extends Component {
	constructor (props) {
		super(props);

		this.state = {
			"email-address": new Animated.Value(0),
			password: new Animated.Value(0)
		}
	}

	_handleSubmit(obj) {
		this.props.submitForm({
			email: obj["email-address"],
			password: obj.password
		});
	}

	_selectField (field) {
		Animated.timing(
			this.state[field],
			{toValue: 1}
		).start();
	}

	_blurField (field, value) {
		if (value.length === 0) {
			Animated.timing(
			this.state[field],
			{toValue: 0}
		).start();
		}
	}

	_focusNextField (nextField) {
		this.refs[nextField]
			.getRenderedComponent()
			.refs[nextField]
			.focus();
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

	render() {
		const { handleSubmit } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.formContainer}>
					<Text style={styles.text}>
						Login
					</Text>
					<View style={{height: 60}}>
						<Animated.Text style={this._getStyle('email-address')}>Email</Animated.Text>
						<Field
							ref='password'
							name={'email-address'}
							component={myTextField}
							_blurField={this._blurField.bind(this)}
							_selectField={this._selectField.bind(this)}
							autoCapitalize={'none'}
							autoCorrect={false}
							autoFocus={true}
							keyboardType='email-address'
							onSubmitEditing={this._focusNextField.bind(this, 'password')}
							returnKeyType={'next'}
							style={styles.input}
						/>
					</View>
					<View style={{height: 60}}>
						<Animated.Text style={this._getStyle('password')}>Password</Animated.Text>
						<Field
							ref='password'
							name='password'
							component={myTextField}
							withRef={true}
							_blurField={this._blurField.bind(this)}
							_selectField={this._selectField.bind(this)}
							keyboardType='default'
							onSubmitEditing={handleSubmit(this._handleSubmit.bind(this))}
							returnKeyType={'done'}
							secureTextEntry={true}
							style={styles.input}
						/>
					</View>
					<TouchableHighlight
						onPress={this.props.handleSubmit(this._handleSubmit.bind(this))}
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

const validate = values => {
	const errors = {};

	if (!values["email-address"]) {
		errors["email-address"] = "Email is required"
	}

	if (!values.password) {
		errors.password = "Password is required"
	}

	return errors;
}

export default reduxForm({ form: 'login', validate })(Form)