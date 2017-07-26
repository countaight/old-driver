import { fromJS } from 'immutable';

import {
	CHANGE_TEXT,
	SUBMIT_FORM,
	FETCH_USER,
	FETCH_USER_FULFILLED,
	FETCH_USER_REJECTED,
} from '../constants/ActionTypes';

const initialState = fromJS({
	id: null,
	email: "unknown",
	fetching: false,
	fetched: false,
	error: null,
});

export default function userReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCH_USER:
			return state.merge({ fetching: true });

		case FETCH_USER_REJECTED:
			return state.merge({ fetching: false, error: payload });

		case FETCH_USER_FULFILLED:
			const { id, email } = payload;

			return state.merge({
				id,
				email,
				fetching: false,
				fetched: true,
			});
	}

	return state;
}