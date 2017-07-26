import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Login from '../components/Login';
import { changeTxt, submitForm } from '../actions/user';

function mapStateToProps(state) {
	return {
		user: state.userReducer
	}
}

export default connect(
	mapStateToProps,
	{
		submitForm: (fields) => submitForm(fields),
	}
)(Login)