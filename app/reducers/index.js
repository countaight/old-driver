import { combineReducers } from 'redux';

import userReducer from './userReducer';
import tabReducer from './tabReducer';
import navReducer from './navReducer';

export default combineReducers({
	userReducer,
	tabReducer,
	navReducer,
})