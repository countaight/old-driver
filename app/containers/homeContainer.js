import { connect } from 'react-redux';

import Home from '../components/Home';
import { changeTxt, submitForm } from '../actions/userActions';

function mapStateToProps(state) {
	return {
		user: state.userReducer
	}
}

export default connect(
	mapStateToProps,
	{
		onChangeTxt: (field, text) => changeTxt(field, text),
		submitForm: (fields) => submitForm(fields),
	}
)(Home)