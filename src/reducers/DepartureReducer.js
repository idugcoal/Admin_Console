import { FETCH_DEPARTURES } from '../actions/types';

export default (state = {}, action) => {
	switch(action.type) {
		case FETCH_DEPARTURES: 
			return action.payload;
		default:
			return state;
	}
}