import { connect } from 'react-redux';

import Locator from '../components/Locator';
import * as actions from '../actions/location';

function mapStateToProps(state) {
	return Object.assign({}, {
		user: state.userReducer.toJS(),
		location: state.location
	})
}

export default connect(
	mapStateToProps,
	actions
)(Locator)