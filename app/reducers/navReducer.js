import AppNavigator from '../components/AppNavigator'

export default function navReducer(state, action) {
	const newState = AppNavigator.router.getStateForAction(action, state);

	return (newState ? newState : state);
}