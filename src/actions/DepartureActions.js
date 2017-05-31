import firebase from 'firebase';
import { FETCH_DEPARTURES } from './types';

export const fetchDepartures = () => {
	return dispatch => {
		firebase.database().ref('departures/')
			.on('value', snapshot => {
				dispatch({
					type: FETCH_DEPARTURES,
					payload: snapshot.val()
				}).then(() => console.log(snapshot.val()));
			});
		};
}