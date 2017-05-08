import AppNavigator from '../components/AppNavigator'

export default function navReducer(state, action) {
	console.log(state);
	const newState = AppNavigator.router.getStateForAction(action, state);

	return (newState ? newState : state);
}