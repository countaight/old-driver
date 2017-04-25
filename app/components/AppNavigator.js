import { StackNavigator, TabNavigator, TabView } from 'react-navigation';

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
			tabBarComponent: TabView.TabBarBottom,
			tabBarPosition: 'bottom',
			lazyLoad: true,
			animationEnabled: true,
			tabBarOptions: {
				showLabel: false,
				activeBackgroundColor: '#006838',
				activeTintColor: 'white',
			}
		})
	}
}, {
	headerMode: 'none',
});

export default AppNavigator;