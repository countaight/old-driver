import React, { Component } from 'react';
import {
	Alert,
	Animated,
	Easing,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { ListItem } from 'react-native-elements';

export default class Assignment extends Component {
	constructor (props) {
		super(props);
		this.state = {
			height: new Animated.Value(0),
		}
	}

	_animatedStyle () {
		const { height } = this.state;
		const offset = height.interpolate({
			inputRange: [0, 100],
			outputRange: [-10, 0]
		})
		const padding = height.interpolate({
			inputRange: [0, 100],
			outputRange: [0, 10]
		})

		return {
			height,
			padding,
			top: offset,
		}
	}

	_handlePress () {
		// this.props.navigation.navigate('Locator', { location: info.place.location })
		Animated.timing(
			this.state.height,
			{
				toValue: 100,
				duration: 500,
				easing: Easing.bounce
			}
		).start()
	}

	render () {
		const { info } = this.props;
		let color = info.pu_del === 'PU' ? '#006838' : 'orange'
		let chevronColor = info.pu_del === 'PU' ? '#4c9573' : '#CC6E2F'
		return (
			<View>
				<ListItem
					key={info.id}
					leftIcon={{name: 'local-shipping', color: chevronColor}}
					rightIcon={{name: 'chevron left'}}
					onPressRightIcon={() => Alert.alert("CLICKED")}
					titleStyle={{color: 'white'}}
					containerStyle={{backgroundColor: color}}
					chevronColor={chevronColor}
					underlayColor={chevronColor}
					title={info.place.name}
				/>
				<Animated.View style={[this._animatedStyle(), styles.description]}>
					<Text>{JSON.stringify(info)}</Text>
				</Animated.View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	description: {
		zIndex: -1000
	}
})