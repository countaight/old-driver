import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';

class Home extends Component {
	static navigationOptions = {
		tabBarLabel: 'Home',
		tabBarIcon: ({ tintColor }) => {
			return (
				<Icon name='home' color={tintColor} />
			)
		},
	}

	shouldComponentUpdate (nextProps) {
		const tabName = this.props.navigation.state.routeName;
		const currentStack = this.props.screenProps.routes[this.props.screenProps.index];
		const currentTab = currentStack.routes[currentStack.index].routeName;

		if (tabName === currentTab) {
			return true;
		}

		return false;
	}

	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome to the Noel Transportation App. Stay on the Locator tab to send location.</Text>
				<List>
					<ListItem
						title='Noel Transportation'
						onPress={() => this.props.navigation.navigate('Locator', { location: { lat: 41.9434762, lng: -87.9039103 } })}
					/>
				</List>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	welcome: {
		textAlign: 'center',
		fontSize: 16,
		width: 300,
		fontFamily: 'Montserrat-Regular'
	}
})

export default Home;