import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyANZkJFfO_h_h-TIFtevNMYrkBb0pRv_AA",
  authDomain: "sna-test.firebaseapp.com",
  databaseURL: "https://sna-test.firebaseio.com",
  storageBucket: "sna-test.appspot.com",
  messagingSenderId: "1051847567636"
}

firebase.initializeApp(config)

export const active = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const mapAPIKey = "AIzaSyAozTKkaSVFmxr_Z35VLXACmrn80M7HPUs"
