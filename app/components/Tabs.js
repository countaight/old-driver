import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import Tab from './Tab';

export default class TabsModule extends Component {
	constructor (props) {
		super(props);
		this.state = {
			pan: new Animated.ValueXY()
		}
	}

	componentDidMount () {
		Animated.spring(this.state.pan,
			{
				tension: 2,
				friction: 3,
				toValue: {
					x: 0,
					y: -50
				}
			}).start();
	}

	getStyle () {
		return [
			styles.tabs,
			{
				transform: this.state.pan.getTranslateTransform()
			}
		]
	}

	render () {
		return (
			<Animated.View style={this.getStyle()}>
				{this.props.navigationState.routes.map(this._renderTab, this)}
			</Animated.View>
		)
	}

	_renderTab (route, index) {
		return (
			<Tab
				key={route.key}
				route={route}
				selected={this.props.navigationState.index === index}
				changeTab={this.props.changeTab}
			/>
		);
	}
}

const styles = StyleSheet.create({
	tabs: {
		height: 50,
		flexDirection: 'row',
		bottom: -50,
	}
})