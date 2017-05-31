import { combineReducers } from 'redux';
import departureReducer from './DepartureReducer';
import authReducer from './AuthReducer';

const rootReducer = combineReducers({
	departures: departureReducer,
	auth: authReducer
});

export default rootReducer;