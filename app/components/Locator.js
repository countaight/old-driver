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

	componentDidMount() {
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				var initialLong = JSON.stringify(position.coords.longitude);
				var initialLat = JSON.stringify(position.coords.latitude);
				this.props.fetchTest(this.props.user.id, { initialLong, initialLat });
			},
			(error) => alert(error)
		);
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	_fetchCoords() {
		this.props.fetchCoords(this.props.user.id);
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