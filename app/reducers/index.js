import { combineReducers } from 'redux';

import userReducer from './userReducer';
import navReducer from './navReducer';
import {connectionReducer} from './connectionReducer';
import {conversationReducer} from './conversationReducer';

export default combineReducers({
	userReducer,
	navReducer,
	connection: connectionReducer,
	conversation: conversationReducer,
})