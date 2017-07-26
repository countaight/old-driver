import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import userReducer from './userReducer';
import locationReducer from './location';
import navReducer from './navReducer';
import { connectionReducer } from './connectionReducer';
import { conversationReducer } from './conversationReducer';

export default combineReducers({
	form,
	navReducer,
	userReducer,
	location: locationReducer,
	connection: connectionReducer,
	conversation: conversationReducer,
})