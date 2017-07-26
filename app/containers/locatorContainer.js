import { connect } from 'react-redux';

import Locator from '../components/Locator';
import { fetchCoords, postCoords } from '../actions/location';

function mapStateToProps(state) {
	return Object.assign({}, {
		user: state.userReducer.toJS(),
		location: state.location
	})
}

export default connect(
	mapStateToProps,
	{
		fetchCoords: (userId) => fetchCoords(userId),
		postCoords: (userId, coords) => postCoords(userId, coords),
	}
)(Locator)