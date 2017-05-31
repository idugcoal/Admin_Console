import { combineReducers } from 'redux';
import departureReducer from './DepartureReducer';

const rootReducer = combineReducers({
	departures: departureReducer
});

export default rootReducer;