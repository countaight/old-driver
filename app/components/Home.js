import React, { Component } from 'react';
import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Card, Icon, List, ListItem } from 'react-native-elements';

import Assignment from './Assignment';

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

	_renderAssignments ({ item }) {
		return <Assignment key={item.id} info={item} navigation={this.props.navigation} />
	}

	render () {
		const { user } = this.props;
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
					<FlatList
						data={user.assignments}
						renderItem={this._renderAssignments.bind(this)}
						keyExtractor={(item, index) => item.id}
					/>
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