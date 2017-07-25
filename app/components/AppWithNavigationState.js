import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';

import AppNavigator from './AppNavigator';

export default class AppWithNavigationState extends Component {
	render() {
		return(
			<AppNavigator
				screenProps={this.props.nav}
				navigation={addNavigationHelpers({
					dispatch: this.props.dispatch,
					state: this.props.nav
				})}
			/>
		)
	}
}