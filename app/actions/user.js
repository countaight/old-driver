import { Platform, ToastAndroid } from 'react-native';

import {
	SUBMIT_FORM,
	FETCH_USER,
	FETCH_USER_FULFILLED,
	FETCH_USER_REJECTED
} from '../constants/ActionTypes';

export function submitForm(fields) {
	return function(dispatch) {
		dispatch({
			type: FETCH_USER
		});

		fetch('http://localhost:3000/login.json', {
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
			} else {
				console.log(error);
			}
		})
	}
}