import { connect } from 'react-redux';

import TabsRoot from '../components/TabsRoot';
import { changeTab, pop, push } from '../actions/navActions';
import { fetchCoords } from '../actions/userActions';

function mapStateToProps (state) {
  return {
    tabs: state.tabReducer,
    user: state.userReducer,
  }
}

export default connect(
  mapStateToProps,
  {
    changeTab: (route) => changeTab(route),
    fetchCoords: () => fetchCoords(),
    pushRoute: (route) => push(route),
		popRoute: () => pop()
  }
)(TabsRoot)