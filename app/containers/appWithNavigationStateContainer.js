import { connect } from 'react-redux';

import AppWithNavigationState from '../components/AppWithNavigationState';

function mapStateToProps(state) {
	return {
		nav: state.navReducer
	}
}

export default connect(
	mapStateToProps,
)(AppWithNavigationState)