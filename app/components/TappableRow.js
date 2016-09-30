import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

export default class TappableRow extends Component {
	render () {
		let button = null;
		let buttonText = null;
		if (this.props.styles) {
			button = this.props.styles.button;
			buttonText = this.props.styles.buttonText;
		}
		return (
			<TouchableHighlight
				underlayColor="#26845b"
				onPress={this.props.onPress}
				style={button}
			>
				<Text style={buttonText}>
					{this.props.text}
				</Text>
			</TouchableHighlight>
		)
	}
}