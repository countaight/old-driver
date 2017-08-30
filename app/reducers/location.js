import {
	FETCH_COORDS,
	FETCH_COORDS_FULFILLED,
	FETCH_COORDS_REJECTED
} from '../constants/ActionTypes'

const initialState = {
	coordinates: { lat: 0, lng: 0 },
	updated_at: null,
	fetching: false,
	error: null
};

export default function locationReducer(state = initialState, { type, payload }) {
	switch(type) {
		case FETCH_COORDS:
			return { ...state, fetching: true };

		case FETCH_COORDS_FULFILLED:
			const { coordinates, updated_at } = payload;

			return {
				...state,
				fetching: false,
				coordinates,
				updated_at
			}

		case FETCH_COORDS_REJECTED:
			return {
				...state,
				fetching: false,
				error: payload
			}
	}

	return state;
}