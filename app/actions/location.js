import {
	FETCH_COORDS,
	FETCH_COORDS_FULFILLED,
	FETCH_COORDS_REJECTED
} from '../constants/ActionTypes';

export function fetchCoords(userId) {
	return function(dispatch) {
		// Dispatch the initial FETCH_COORDS action to load spinner
		dispatch({ type: FETCH_COORDS });

		// Start Async retrieval of location from the device
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lng = position.coords.longitude;
				const lat = position.coords.latitude;

				// Dispatch a subsequent action to post the coordinatees if successful
				dispatch(postCoords(userId, { lng, lat }));
			},
			(error) => dispatch({ type: FETCH_COORDS_REJECTED, payload: error })
		);
	}
}

export function updateCoords(coords) {
	return { type: FETCH_COORDS_FULFILLED, payload: coords };
}

export function postCoords(userId, coords) {
	return function(dispatch) {
		dispatch({ type: FETCH_COORDS });

		fetch('http://172.16.1.15:3000/testing.json', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				coordinates: coords
			})
		})
		.then((response) => response.json())
		.then((respJSON) => {
			dispatch({
				type: FETCH_COORDS_FULFILLED,
				payload: { coordinates: respJSON.body, updated_at: Date.now() }
			});
		})
		.catch((error) => dispatch({ type: FETCH_COORDS_REJECTED, payload: error }));
	}
}