import React, { Component } from 'react'
import firebase from 'firebase'
import { Grid } from 'react-virtualized'

export default class Table extends Component {
	componentDidMount() {
		let arrivals = firebase.database().ref('/arrival/');
		let arrivalsArray = [];
		arrivals.on('value', function(snapshot) {
			//set state with new value
			for (var timestamp in snapshot.val()) {
				let i = 0
				for (var field in snapshot.val()[timestamp]) {
					this.state = {
						list: arrivalsArray[i] = snapshot.val()[timestamp][field]
					}
					console.log(field, arrivalsArray[i]);
					i++;
				}
			}
		})
		let departures = firebase.database().ref('/departure/');
		let departuresArray = [];
		departures.on('value', function(snapshot) {
			for (var timestamp in snapshot.val()) {
				let i = 0
				for (var field in snapshot.val()[timestamp]) {
					departuresArray[i] = snapshot.val()[timestamp][field]
					// console.log(field, departuresArray[i]);
					i++;
				}
			}
		})
		let preboards = firebase.database().ref('/preboard/');
		let preboardsArray = [];
		preboards.on('value', function(snapshot) {
			for (var timestamp in snapshot.val()) {
				let i = 0
				for (var field in snapshot.val()[timestamp]) {
					preboardsArray[i] = snapshot.val()[timestamp][field]
					// console.log(field, preboardsArray[i]);
					i++;
				}
			} 
		})
		let wheelchairs = firebase.database().ref('/wheelchairs/');
		let wheelchairsArray = [];
		wheelchairs.on('value', function(snapshot) {
			for (var timestamp in snapshot.val()) {
				let i = 0;
				for (var field in snapshot.val()[timestamp]) {
					wheelchairsArray[i] = snapshot.val()[timestamp][field]
					// console.log(field, wheelchairsArray[i]);
					i++;
				}
			} 
		})
	}

  render () {
    return (
      <div>
        Table. This is a protected route. You can only see this if you're authed.
       
      </div>
    )
  }
}