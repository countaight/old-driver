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
	constructor (props) {
		super(props);
		this.state = {
			ws: {}
		}
	}

	componentDidMount() {
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				var initialLong = JSON.stringify(position.coords.longitude);
				var initialLat = JSON.stringify(position.coords.latitude);
				this._updateCoords(this.props.user.id, { initialLong, initialLat });
			},
			(error) => alert(error)
		);

		const ws = new WebSocket("ws://noeltrans.herokuapp.com/mapsocket");
		ws.onopen = (e) => {
			ToastAndroid.show('Connected!', ToastAndroid.SHORT);
			ws.send(this.props.user.email + " has connected!");
			this.setState({ ...this.state, ws })
		}

		ws.onmessage = (e) => {
			ToastAndroid.show(e.data, ToastAndroid.SHORT);
		}
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
		this.state.ws.close();
		this.setState({ ...this.state, ws: {} })
	}

	_fetchCoords() {
		this.props.fetchCoords(this.props.user.id);
	}

	_updateCoords(userId, coords) {
		this.props.fetchTest(userId, coords);
		this.state.ws.send(JSON.stringify({ id: userId, coordinates: coords }));
	}

	render() {
		const { user } = this.props;
		return (
			<View style={styles.container}>
				<Text style={{fontFamily: 'ReemKufi-Regular', width: 210}}>
					<Text>{"\n"}{user.email}{"\n"}</Text>
					<Text>{"\n"}Map Coordinates {"\n"}Longitude: {user.initialLong}{"\n"}</Text>
					<Text>Latitude: {user.initialLat}</Text>
					{"\n"}
				</Text>
				<TappableRow
					text="Check In"
					onPress={this._fetchCoords.bind(this)}
					styles={styles}
				/>
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