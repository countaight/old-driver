import {
	FETCH_COORDS,
	FETCH_COORDS_FULFILLED,
	FETCH_COORDS_REJECTED
} from '../constants/ActionTypes'

const initialState = {
	lng: 0,
	lat: 0,
	updated_at: null,
	fetching: false,
	error: null
};

export default function locationReducer(state = initialState, action) {
	switch(action.type) {
		case FETCH_COORDS:
			return { ...state, fetching: true };
		case FETCH_COORDS_FULFILLED:
			const { lat, lng, updated_at } = action.payload

			return {
				...state,
				fetching: false,
				lat,
				lng,
				updated_at
			}
		case FETCH_COORDS_REJECTED:
			return {
				...state,
				fetching: false,
				error: action.payload
			}
	}

	return state;
}