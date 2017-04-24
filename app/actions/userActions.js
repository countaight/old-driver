import { Platform, ToastAndroid } from 'react-native';

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

export function fetchCoords(userId) {
	return function(dispatch) {
		dispatch({ type: FETCH_COORDS });
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lng = position.coords.longitude;
				const lat = position.coords.latitude;
				dispatch(fetchTest(userId, { lng, lat }));
			},
			(error) => dispatch({ type: FETCH_COORDS_REJECTED, payload: error })
		);
	}
}

export function fetchTest(userId, coords) {
	return function(dispatch) {
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
				payload: respJSON.body
			});
		})
		.catch((error) => console.error(error))
	}
}

export function changeTxt(field, text) {
	return {
		type: CHANGE_TEXT,
		text,
		field,
	}
}

export function submitForm(fields) {
	return function(dispatch) {
		dispatch({
			type: FETCH_USER
		});
		fetch('http://172.16.1.15:3000/login.json', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				session: fields
			})
		})
		.then((response) => response.json())
		.then((respJSON) => {
			dispatch({
				type: FETCH_USER_FULFILLED,
				payload: respJSON.body
			});
			dispatch({
				type: 'Navigation/NAVIGATE',
				routeName: 'LoggedIn'
			});
			
			if (Platform.OS === 'android') {
				ToastAndroid.show('Success!', ToastAndroid.SHORT);
			}
		})
		.catch((error) => {
			dispatch({
				type: FETCH_USER_REJECTED,
				payload: error
			});
			if (Platform.OS === 'android') {
				ToastAndroid.show('Email/Password combinations was incorrect. Try again.', ToastAndroid.SHORT);
			}
		})
	}
}