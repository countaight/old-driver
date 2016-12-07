import {
	CHANGE_TEXT,
	SUBMIT_FORM,
	FETCH_USER,
	FETCH_USER_FULFILLED,
	FETCH_USER_REJECTED,
	FETCH_COORDS,
	FETCH_COORDS_FULFILLED,
	FETCH_COORDS_REJECTED
} from '../constants/ActionTypes';

const initialState = {
	email: "",
	password: "",
	user: {
		id: null,
		email: "unknown",
		lng: 0,
		lat: 0,
		updated_at: null
	},
	fetching: false,
	fetched: false,
	error: null,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_TEXT: {
			const field = action.field
			return {
				...state,
				[field]: action.text,
			}
		}
		case FETCH_COORDS: {
			return { ...state, fetching: true }
		}
		case FETCH_COORDS_FULFILLED: {
			const { lat, lng, updated_at } = action.payload
			const user = { ...state.user, lat, lng, updated_at }
			return {
				...state,
				fetching: false,
				user,
			}
		}
		case FETCH_COORDS_REJECTED: {
			return {
				...state,
				fetching: false,
				error: action.payload,
			}
		}
		case FETCH_USER: {
			return { ...state, fetching: true }
		}
		case FETCH_USER_REJECTED: {
			return { ...state, fetching: false, error: action.payload }
		}
		case FETCH_USER_FULFILLED: {
			const { id, email, updated_at } = action.payload
			const user = { ...state.user, id, email, updated_at }
			return { 
				...state, 
				fetching: false, 
				fetched: true,
				user,
			}
		}
	}
	return state;
}