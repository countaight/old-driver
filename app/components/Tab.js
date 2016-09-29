import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class Tab extends Component {
	constructor(props) {
		super(props);
		this._onPress = this._onPress.bind(this);
	}

	render () {
		const style = [styles.tabText];
		const tabStyle = [styles.tab];
		if (this.props.selected) {
			style.push(styles.tabSelected);
			tabStyle.push(styles.tabStyleSelected);
		}
		
		return (
			<TouchableOpacity style={tabStyle} onPress={this._onPress}>
				<Text style={style}>
					{this.props.route.key}
				</Text>
			</TouchableOpacity>
		);
	}

	_onPress () {
		this.props.changeTab(this.props.route.key);
	}
}

const styles = StyleSheet.create({
	tab: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
	},
	tabText: {
		color: '#222',
		fontFamily: 'Montserrat-Regular',
	},
	tabSelected: {
		color: '#006838',
		fontFamily: 'Montserrat-Bold'
	},
	tabStyleSelected: {
		backgroundColor: '#E9E9EF',
	}
});