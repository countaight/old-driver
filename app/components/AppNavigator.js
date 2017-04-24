import { StackNavigator, TabNavigator } from 'react-navigation';

import myHome from '../containers/homeContainer';
import myLocator from '../containers/locatorContainer';
import LoginForm from '../containers/loginContainer';

const AppNavigator = StackNavigator({
	Login: { screen: LoginForm },
	LoggedIn: {
		screen: TabNavigator({
			Home: {
				screen: myHome
			},
			Locator: {
				screen: myLocator
			},
		}, {
			lazyLoad: true,
			animationEnabled: true,
		})
	}
}, {
	headerMode: 'none',
});

export default AppNavigator;