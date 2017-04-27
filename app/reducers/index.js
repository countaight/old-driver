import { combineReducers } from 'redux';

import userReducer from './userReducer';
import navReducer from './navReducer';

export default combineReducers({
	userReducer,
	navReducer,
})