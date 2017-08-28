import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import myHome from '../containers/homeContainer';
import myLocator from '../containers/locatorContainer';
import LoginForm from '../containers/loginContainer';
import ChatContainer from '../containers/chatContainer';

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
			Chat: {
				screen: ChatContainer
			}
		}, {
			tabBarComponent: TabBarBottom,
			tabBarPosition: 'bottom',
			lazy: true,
			animationEnabled: true,
			tabBarOptions: {
				inactiveBackgroundColor: '#E9E9E9',
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