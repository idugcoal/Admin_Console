import firebase from 'firebase';
import { config } from '../config';

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();