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
		this.state = {
			region: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0.1022,
				longitudeDelta: 0.0521,
			},
			messageText: 'Nothing Yet',
		};
	}

	componentDidMount() {
		this.ws = new WebSocket("ws://172.16.1.15:3000/mapsocket");
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				let lng = position.coords.longitude;
				let lat = position.coords.latitude;
				this._updateCoords(this.props.user.id, { lng, lat });
			},
			(error) => console.log(error)
		);

		this.ws.onopen = (e) => {
			if (Platform.OS === 'android') {
				ToastAndroid.show('Connected!', ToastAndroid.SHORT);
			};

			this.ws.send(this.props.user.email + " has connected!");
		}

		this.ws.onmessage = (e) => {
			if (Platform.OS === 'android') {
				ToastAndroid.show(e.data, ToastAndroid.SHORT);
			} else {
				this.setState({...this.state, messageText: e.data});
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
		if (this.ws && this.ws.readyState === 1) {
			this.ws.send(JSON.stringify(message));
		}

		this.props.fetchTest(userId, coords);
	}

	render() {
		const { user } = this.props;
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
			    initialRegion={{
			      latitude: user.lat,
			      longitude: user.lng,
			      latitudeDelta: 0.1022,
			      longitudeDelta: 0.0521,
			    }}
			    region={this.state.region}
			    onRegionChange={(coordinates) => this.setState({...this.state, region: coordinates})}
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
				<Text onPress={() => this.setState({...this.state, region: {latitude: user.lat, longitude: user.lng, latitudeDelta: 0.1022, longitudeDelta: 0.0521}})}>
					Find Me!
				</Text>
				{Platform.OS === 'ios' ? <Text>{this.state.messageText}</Text> : null}
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