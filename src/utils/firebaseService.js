import firebase from 'firebase';
import config from '../../config.js';

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();