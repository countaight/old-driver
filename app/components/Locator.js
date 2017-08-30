import React, { Component } from 'react';
import Moment from 'moment';
import {
	AppState,
	AsyncStorage,
	Dimensions,
	Linking,
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

const { width, height } = Dimensions.get('window');

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
				latitude: props.location.coordinates.lat || 0,
				longitude: props.location.coordinates.lng || 0,
				latitudeDelta: 0.1022,
				longitudeDelta: 0.0521,
			},
			messageText: 'Nothing Yet',
		};

		this._handleAppStateChange = this._handleAppStateChange.bind(this);
		this._handleRegionChange = this._handleRegionChange.bind(this);
	}

	componentDidMount () {
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

		AppState.addEventListener('change', this._handleAppStateChange);
	}

	componentWillUnmount () {
		AppState.removeEventListener('change', this._handleAppStateChange);

		navigator.geolocation.clearWatch(this.watchID);
		this.ws.close();
		this.ws = null;
	}

	_setupMap () {
		const { params } = this.props.navigation.state;

		if (params) {
			this.map.animateToRegion({
				latitude: params.location.lat,
				longitude: params.location.lng,
				latitudeDelta: 0.1022,
				longitudeDelta: 0.0521,
			});
		} else {
			this.map.animateToRegion(this.state.region);
		}
	}

	_fetchCoords () {
		this.props.fetchCoords(this.props.user.id);
	}

	_handleAppStateChange (nextAppState) {
		const { user, location } = this.props;
		if (nextAppState === 'background' || nextAppState === 'active') {
			this.props.postCoords(user.id, location.coordinates);
		}
	}

	_updateCoords (userId, coords) {
		const message = {
			id: userId,
			coordinates: coords,
			updated_at: Moment().toISOString()
		}
		if (this.ws && this.ws.readyState === 1) {
			this.ws.send(JSON.stringify(message));
		}

		this.props.updateCoords({ coordinates: coords, updated_at: Date.now() });
	}

	_determineMapView () {
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

	_handleRegionChange (region) {
		this.props.navigation.setParams({ location: {} });

		this.setState({ ...this.state, region });
	}

	_followLink(coords) {
		const url = `http://maps.apple.com/?q=${coords.lat},${coords.lng}`

		Linking.canOpenURL(url).then(supported => {
		  if (!supported) {
		    console.log('Can\'t handle url: ' + url);
		  } else {
		    return Linking.openURL(url);
		  }
		})
			.catch(err => console.error('An error occurred', err));
	}

	_renderAssignments () {
		const { user, location } = this.props;

		let initMarker = (
			<MapView.Marker
				key={"user-" + user.id}
				title={user.name}
				pinColor={'#006838'}
				description={`Latitude: ${location.coordinates.lat}, Longitude: ${location.coordinates.lng}`}
				coordinate={{latitude: location.coordinates.lat, longitude: location.coordinates.lng}}
			/>
		)

		if (user.assignments.length > 0) {
			return user.assignments.map(assignment => {
				const { place } = assignment;

				return (
					<MapView.Marker
						key={assignment.id}
						title={assignment.place.name}
						pinColor={assignment.pu_del === 'PU' ? 'lightgreen' : 'orange'}
						coordinate={{latitude: place.location.lat, longitude: place.location.lng}}
						description={'Click to open in Maps'}
						onCalloutPress={this._followLink.bind(this, place.location)}
						draggable
					/>
				)
			}).concat(initMarker);
		}

		return initMarker;
	}

	render() {
		const { user, location } = this.props;

		return (
			<View style={styles.container}>
				<MapView
					ref={ref => this.map = ref}
					style={styles.map}
					initialRegion={this.state.region}
			    region={this._determineMapView()}
			    onRegionChange={this._handleRegionChange}
			    onMapLoaded={this._setupMap.bind(this)}
			    loadedEnabled={true}
				>
					{this._renderAssignments()}
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
								latitude: location.coordinates.lat,
								longitude: location.coordinates.lng,
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