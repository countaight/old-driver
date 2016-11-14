import React, { Component } from 'react';
import { 
	StatusBar, 
	StyleSheet, 
	Text, 
	TextInput, 
	ToastAndroid, 
	TouchableHighlight, 
	View 
} from 'react-native';

import TappableRow from './TappableRow';

class Locator extends Component {
	watchID: ?number = null;
	ws: null;

	constructor (props) {
		super(props);
	}

	componentWillMount() {
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				var initialLong = JSON.stringify(position.coords.longitude);
				var initialLat = JSON.stringify(position.coords.latitude);
				this._updateCoords(this.props.user.id, { initialLong, initialLat });
			},
			(error) => alert(error)
		);

		const ws = new WebSocket("wss://noeltrans.herokuapp.com/mapsocket");
		ws.onopen = (e) => {
			ToastAndroid.show('Connected!', ToastAndroid.SHORT);
			ws.send(this.props.user.email + " has connected!");
			this.ws = ws;
		}

		ws.onmessage = (e) => {
			ToastAndroid.show(e.data, ToastAndroid.SHORT);
		}
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
		this.ws.close();
		this.ws = null;
	}

	_fetchCoords() {
		this.props.fetchCoords(this.props.user.id);
	}

	_updateCoords(userId, coords) {
		this.props.fetchTest(userId, coords);
	}

	render() {
		const { user } = this.props;
		console.log(user);
		return (
			<View style={styles.container}>
				<Text style={{fontFamily: 'ReemKufi-Regular', width: 210}}>
					<Text>Keep this tab open to continue sending your location.{"\n"}</Text>
					<Text>Last updated: {user.updated_at}</Text>
				</Text>
			</View>
		)
	}

	_goBack() {
		if (this.props.navigationState.index === 0) {
			return false
		}
		this.props._goBack()
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#E9E9EF',
	},
	button: {
		height: 90,
		width: 210,
		backgroundColor: '#006838',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 25,
		fontFamily: "ReemKufi-Regular",
		color: "white",
	},
})

export default Locator;