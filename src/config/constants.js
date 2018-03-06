import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyANZkJFfO_h_h-TIFtevNMYrkBb0pRv_AA",
  authDomain: "sna-test.firebaseapp.com",
  databaseURL: "https://sna-test.firebaseio.com",
  storageBucket: "sna-test.appspot.com",
  messagingSenderId: "1051847567636"
}

firebase.initializeApp(config)
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const mapAPIKey = "AIzaSyAozTKkaSVFmxr_Z35VLXACmrn80M7HPUs"

export const active = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
export const wheelchairs = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,                                                                                                                                                         
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  91, 92, 93, 94, 95, 96, 97, 98, 99, 100
];
export const arrivalList = [['Airline', 'Comments', 'Dropoff', 'Device ID', 'User', 'Flight', 'P1 First Name', 'P1 Last Name', 'P1 Wheelchair', 'P2 First Name', 'P2 Last Name', 'P2 Wheelchair', 'Start Location', 'Starting GPS', 'Stops', 'End Time', 'Start Time']]
export const departureList = [['Airline', 'Final Comments', 'TSA Comments', 'Destination Gate', 'Device ID', 'User', 'Final Gate', 'Flight', 'P1 First Name', 'P1 Last Name', 'P1 Wheelchair', 'P2 First Name', 'P2 Last Name', 'P2 Wheelchair', 'Start Location', 'Starting GPS', 'Stops', 'End Time', 'Start Time', 'TSA Start Time', 'TSA End Time']]
export const preboardList = [['Airline', 'Comments', 'Device ID', 'User', 'Flight', 'First Name', 'Last Name', 'Wheelchair', 'Preboard Type', 'Starting Gate', 'End Time', 'Start Time']]
export const transferList = [['Airline', 'Comments', 'Device ID', 'User', 'Ending Gate', 'Flight', 'First Name', 'Last Name', 'Wheelchair', 'Starting Gate', 'End Time', 'Start Time']]

