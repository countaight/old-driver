import { NavigationExperimental } from 'react-native';

import { CHANGE_TAB, POP_ROUTE, PUSH_ROUTE } from '../constants/ActionTypes'

const {
	StateUtils: NavigationStateUtils
} = NavigationExperimental

const routes = [
  { key: 'home', title: 'Main' },
  { key: 'locator', title: 'Locator' },
]

const initialState = {
	tabs: {
	  index: 0,
	  routes,
	},
  home: {
  	index: 0,
  	routes: [{ key: 'Home' }],
  },
  locator: {
  	index: 0,
  	routes: [{ key: 'Locator' }],
  },
}

function tabsNav (state = initialState, action) {
  switch (action.type) {
  	case PUSH_ROUTE: {
  		const route = action.route;
  		const { tabs } = state;
  		const tabKey = tabs.routes[tabs.index].key;
  		const scenes = state[tabKey];
  		const nextScenes = NavigationStateUtils.push(scenes, route);
  		if (scenes !== nextScenes) {
  			return {
  				...state,
  				[tabKey]: nextScenes,
  			};
  		}
  	}

  	case POP_ROUTE: {
  		const { tabs } = state;
  		const tabKey = tabs.routes[tabs.index].key;
  		const scenes = state[tabKey];

  		if (scenes.index === 0) {
  			return state;
  		}

  		const nextScenes = NavigationStateUtils.pop(scenes)
  		if (scenes !== nextScenes) {
  			return {
  				...state,
  				[tabKey]: nextScenes,
  			};
  		}
  	}

    case CHANGE_TAB: {
    	const tabKey = action.tabKey;
    	const tabs = NavigationStateUtils.jumpTo(state.tabs, tabKey);
    	if (tabs !== state.tabs) {
	      return {
	        ...state,
	        tabs,
	      };
    	}
    }

    default:
      return state
  }
}

export default tabsNav