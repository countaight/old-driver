
import React, { Component } from 'react';
import { BackAndroid, NavigationExperimental, StyleSheet, Text, ToolbarAndroid, View } from 'react-native';

import Home from '../containers/homeContainer';
import Locator from '../containers/locatorContainer';
import TabsModule from './Tabs';
import TappableRow from './TappableRow';

const {
	CardStack: NavigationCardStack
} = NavigationExperimental;

export default class Tabs extends Component {
	constructor (props) {
		super(props);
		this._renderScene = this._renderScene.bind(this);
		this._handleBackAction = this._handleBackAction.bind(this);
	}

	componentDidMount () {
		BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
	}

	componentWillUnmount () {
		BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
	}

	_handleBackAction () {
		this.props.popRoute();
		return true
	}

	_handleNavigate (action) {
		switch (action.type) {
			case 'push': {
				this.props.pushRoute(action.route);
				return true;
			}
			case 'back':
			case 'pop': {
				return this._handleBackAction();
			}
			default: {
				return false;
			}
		}
	}

	render() {
		const { tabs } = this.props.tabs;
		const tabKey = tabs.routes[tabs.index].key;
		const scenes = this.props.tabs[tabKey];
		if (this.props.user.fetched === true) {
			var view = <TabsModule changeTab={this.props.changeTab} navigationState={tabs}/>
		}

		return (
			<View user={this.props.user.user} style={styles.navigate}>
				<NavigationCardStack
					key={'stack_' + this.tabKey }
					onNavigate={this._handleNavigate}
					navigationState={scenes}
					renderScene={this._renderScene}
					style={styles.navigatorCardStack}
					user={this.props.user.user}
				/>
				{ view }
			</View>
		);
	}

	_renderScene(sceneProps) {
		const { route } = sceneProps.scene
		if (route.key === 'Home') {
			return (
				<Home
					{...sceneProps}
					_handleNavigate={this._handleNavigate.bind(this)}
				/>
			)
		}

		if (route.key === 'Locator') {
			return (
				<Locator
					{...sceneProps}
					_handleNavigate={this._handleNavigate.bind(this)}
				/>
			)
		}
	}
}

const styles = StyleSheet.create({
  navigate: {
  	flex: 1,
  	backgroundColor: "#E9E9EF",
  },
  navigatorCardStack: {
  	flex: 20
  },
});