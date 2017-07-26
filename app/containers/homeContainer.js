import { connect } from 'react-redux';

import Home from '../components/Home';
import { changeTxt, submitForm } from '../actions/user';

function mapStateToProps(state) {
	return {
		user: state.userReducer
	}
}

export default connect(
	mapStateToProps
)(Home)