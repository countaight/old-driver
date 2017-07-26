import { connect } from 'react-redux';

import Home from '../components/Home';
import { changeTxt, submitForm } from '../actions/user';

function mapStateToProps(state) {
	return Object.assign({}, {
		user: state.userReducer.toJS()
	});
}

export default connect(
	mapStateToProps
)(Home)