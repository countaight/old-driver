import { connect } from 'react-redux';

import Login from '../components/Login';
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
)(Login)