import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';

import AppNavigator from './AppNavigator';

export default class AppWithNavigationState extends Component {
	render() {
		return(
			<AppNavigator navigation={addNavigationHelpers({
				dispatch: this.props.dispatch,
				state: this.props.nav
			})} />
		)
	}
}