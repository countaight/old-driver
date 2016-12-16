import React, { Component } from 'react';
import Moment from 'moment';
import {
	Platform,
	StatusBar, 
	StyleSheet, 
	Text, 
	TextInput, 
	ToastAndroid, 
	TouchableHighlight, 
	View 
} from 'react-native';
import MapView from 'react-native-maps';

import TappableRow from './TappableRow';

class Locator extends Component {
	watchID: ?number = null;
	ws: null;

	constructor (props) {
		super(props);
	}

	componentDidMount() {
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				let lng = position.coords.longitude;
				let lat = position.coords.latitude;
				this._updateCoords(this.props.user.id, { lng, lat });
			},
			(error) => alert(error)
		);

		const ws = new WebSocket("ws://172.16.1.15:3000/mapsocket");
		ws.onopen = (e) => {
			if (Platform.OS === 'android') {
				ToastAndroid.show('Connected!', ToastAndroid.SHORT);
			};

			ws.send(this.props.user.email + " has connected!");
			this.ws = ws;
		}

		ws.onmessage = (e) => {
			if (Platform.OS === 'android') {
				ToastAndroid.show(e.data, ToastAndroid.SHORT);
			}
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
		const message = {
			id: userId, 
			coordinates: coords, 
			updated_at: Moment().toISOString()
		}

		this.ws.send(JSON.stringify(message));

		this.props.fetchTest(userId, coords);
	}

	render() {
		const { user } = this.props;
		console.log(user);
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
			    initialRegion={{
			      latitude: 37.78825,
			      longitude: -122.4324,
			      latitudeDelta: 0.1022,
			      longitudeDelta: 0.0521,
			    }}
			    region={{
			    	latitude: user.lat,
			    	longitude: user.lng,
			    	latitudeDelta: 0.1022,
			      longitudeDelta: 0.0521,
			    }}
				>
					<MapView.Marker title={user.email} description={`Latitude: ${user.lat} Longitude: ${user.lng}`} pinColor={"darkgreen"} coordinate={{latitude: user.lat, longitude: user.lng}} />
				</MapView>
				<Text style={{opacity: 0.5, fontFamily: 'ReemKufi-Regular', width: 210}}>
					<Text>
						Keep this tab open to continue sending your location.{"\n"}
					</Text>
					<Text>
						Last updated: {Moment(user.updated_at).fromNow()}
					</Text>
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
	map: {
	   ...StyleSheet.absoluteFillObject,
	 },
})

export default Locator;