import React, { Component } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Card, Icon, List, ListItem } from 'react-native-elements';

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
			let color = assignment.pu_del === 'PU' ? '#006838' : 'orange'
			let chevronColor = assignment.pu_del === 'PU' ? '#4c9573' : '#CC6E2F'
			return (
				<ListItem
					key={assignment.id}
					leftIcon={{name: 'local-shipping', color: chevronColor}}
					titleStyle={{color: 'white'}}
					containerStyle={{backgroundColor: color}}
					chevronColor={chevronColor}
					underlayColor={chevronColor}
					title={assignment.place.name}
					onPress={() => this.props.navigation.navigate('Locator', { location: assignment.place.location })}
				/>
			)
		})
	}

	render () {
		const { user } = this.props;
		console.log(user);
		const { width, height } = Dimensions.get('window');

		return (
			<View style={styles.container}>
				<Card
					flexDirection="row"
					containerStyle={{width: Dimensions.get('window').width, margin: 0}}
				>
					<Icon
						name='person'
						containerStyle={{ flex: 1, alignItems: 'flex-start' }}
						size={50}
					/>
					<Text style={styles.welcome}>
						{user.name}{'\n'}
						<Text style={styles.text}>
							No. of Stops: {user.assignments.length}
						</Text>
					</Text>
				</Card>
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
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	welcome: {
		flex: 1,
		textAlign: 'right',
		fontSize: 16,
		fontFamily: 'Montserrat-Regular'
	},
	text: {
		textAlign: 'right',
		fontSize: 12
	}
})

export default Home;