import React, { Component } from 'react';
import Moment from 'moment';
import {
	AppState,
	AsyncStorage,
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
import { Button, Icon } from 'react-native-elements';

class Locator extends Component {
	static navigationOptions = {
		tabBarLabel: 'Locator',
		tabBarIcon: ({ tintColor }) => (
			<Icon name='room' color={tintColor} />
		),
	}

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

		this._handleAppStateChange = this._handleAppStateChange.bind(this);
	}

	componentDidMount() {
		this.ws = new WebSocket("wss://noeltrans.herokuapp.com/mapsocket");

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

		AppState.addEventListener('change', this._handleAppStateChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);

		navigator.geolocation.clearWatch(this.watchID);
		this.ws.close();
		this.ws = null;
	}

	_fetchCoords() {
		this.props.fetchCoords(this.props.user.id);
	}

	_handleAppStateChange(nextAppState) {
		const { user, location } = this.props;
		this.props.postCoords(user.id, { lng: location.lng, lat: location.lat });
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

		this.props.updateCoords(coords);
	}

	_determineMapView() {
		const { params } = this.props.navigation.state;

		if (params) {
			if (Object.keys(params.location).length === 0) {
				return this.state.region;
			}

			return {
				longitude: params.location.lng,
				latitude: params.location.lat,
				latitudeDelta: 0.1022,
				longitudeDelta: 0.0521,
			};
		}

		return this.state.region;
	}

	_handleRegionChange(coords) {
		this.props.navigation.setParams({ location: {} });

		this.setState({...this.state, region: coords});
	}

	render() {
		const { user, location } = this.props;

		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
			    initialRegion={{
			      latitude: location.lat,
			      longitude: location.lng,
			      latitudeDelta: 0.1022,
			      longitudeDelta: 0.0521,
			    }}
			    region={this._determineMapView()}
			    onRegionChange={this._handleRegionChange.bind(this)}
				>
					<MapView.Marker title={user.name} description={`Latitude: ${location.lat} Longitude: ${location.lng}`} pinColor={"darkgreen"} coordinate={{latitude: location.lat, longitude: location.lng}} />
				</MapView>
				<Button
					icon={{name: 'my-location', size: 25, style: {marginRight: 0}}}
					buttonStyle={styles.button}
					borderRadius={2}
					onPress={() => {
						this.props.navigation.setParams({ location: {} });

						this.setState({
							...this.state,
							region: {
								latitude: location.lat,
								longitude: location.lng,
								latitudeDelta: 0.1022,
								longitudeDelta: 0.0521
							}
						});
					}
				} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		backgroundColor: '#E9E9EF',
	},
	button: {
		padding: 5,
		marginBottom: '5%',
		backgroundColor: '#639772',
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
	text: {
		top: 100
	}
})

export default Locator;