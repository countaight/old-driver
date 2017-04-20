import { TabNavigator } from 'react-navigation';

import myHome from '../containers/homeContainer';
import myLocator from '../containers/locatorContainer';

const AppNavigator = TabNavigator({
	Home: {
		screen: myHome
	},
	Locator: {
		screen: myLocator
	},
}, {
	tabBarOptions: {
		lazyLoad: true,
	}
});

export default AppNavigator;