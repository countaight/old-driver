import { CHANGE_TAB, POP_ROUTE, PUSH_ROUTE } from '../constants/ActionTypes';

export function push(route) {
	return {
		type: PUSH_ROUTE,
		route
	}
}

export function pop() {
	return {
		type: POP_ROUTE
	}
}

export function changeTab(tabKey) {
	return {
		type: CHANGE_TAB,
		tabKey
	}
}