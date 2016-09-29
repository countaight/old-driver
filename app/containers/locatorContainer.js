import { connect } from 'react-redux';

import Locator from '../components/Locator';
import { fetchCoords, fetchTest } from '../actions/userActions';

function mapStateToProps(state) {
	return {
		user: state.userReducer.user
	}
}

export default connect(
	mapStateToProps,
	{
		fetchCoords: (userId) => fetchCoords(userId),
		fetchTest: (userId, coords) => fetchTest(userId, coords),
	}
)(Locator)