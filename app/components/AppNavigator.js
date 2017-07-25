import { StackNavigator, TabNavigator, TabView } from 'react-navigation';

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
			tabBarComponent: TabView.TabBarBottom,
			tabBarPosition: 'bottom',
			animationEnabled: true,
			lazy: true,
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