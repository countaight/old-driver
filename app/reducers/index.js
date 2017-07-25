import { combineReducers } from 'redux';

import userReducer from './userReducer';
import locationReducer from './location';
import navReducer from './navReducer';
import {connectionReducer} from './connectionReducer';
import {conversationReducer} from './conversationReducer';

export default combineReducers({
	userReducer,
	navReducer,
	location: locationReducer,
	connection: connectionReducer,
	conversation: conversationReducer,
})