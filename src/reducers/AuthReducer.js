import { 
	LOGIN_USER,
	LOGIN_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	email: '',
	password: '',
	user: null,
	loading: false,
	error: ''
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case LOGIN_USER:
			return { ...state, loading: true, error: '' };
		case LOGIN_USER_SUCCESS: 
			return { ...state, ...INITIAL_STATE, user: action.payload }
		default: 
			return state;
	}
};