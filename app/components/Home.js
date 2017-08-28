import React, { Component } from 'react';
import {
	Dimensions,
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

	_renderAssignments () {
		return this.props.user.assignments.map(assignment => {
			let color = assignment.pu_del === 'PU' ? 'lightgreen' : 'orange'
			return (
				<ListItem
					key={assignment.id}
					containerStyle={{backgroundColor: color}}
					title={assignment.place.name}
					onPress={() => this.props.navigation.navigate('Locator', { location: assignment.place.location })}
				/>
			)
		})
	}

	render () {
		const { user } = this.props;
		const { width, height } = Dimensions.get('window');

		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome, {user.name}!{'\n'}
				</Text>
				<List containerStyle={{ width: (width * .90) }}>
					{this._renderAssignments()}
				</List>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: '10%',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	welcome: {
		textAlign: 'center',
		fontSize: 16,
		width: 300,
		fontFamily: 'Montserrat-Regular'
	}
})

export default Home;