import React, { Component } from 'react'
import firebase from 'firebase'
// import { Grid } from 'react-virtualized'

export default class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrivalList: [],
			departureList: [],
			preboardList: [],
			wheelchairList: []
		}
	}

	onArrivalsChanged(snapshot) {
		let arrivalsArray = []
		for (var timestamp in snapshot.val()) {
			let temp = [];
			for (var field in snapshot.val()[timestamp]) {
				temp.push(snapshot.val()[timestamp][field])
			}
			arrivalsArray.push(temp)
			this.setState({
				arrivalList: [...this.state.arrivalList, arrivalsArray]
			})
		}
	}
	
	onDeparturesChanged(snapshot) {
		let departuresArray = []
		for (var timestamp in snapshot.val()) {
			let temp = [];
			for (var field in snapshot.val()[timestamp]) {
				temp.push(snapshot.val()[timestamp][field])
			}
			departuresArray.push(temp)
			this.setState({
				departureList: [...this.state.departureList, departuresArray]
			})
		}
	}

	onPreboardsChanged(snapshot) {
		let preboardsArray = []
		for (var timestamp in snapshot.val()) {
			let temp = [];
			for (var field in snapshot.val()[timestamp]) {
				temp.push(snapshot.val()[timestamp][field])
			}
			preboardsArray.push(temp)
			this.setState({
				preboardList: [...this.state.preboardList, preboardsArray]
			})
		}
	}

	onWheelchairsChanged(snapshot) {
		let wheelchairsArray = []
		for (var timestamp in snapshot.val()) {
			let temp = [];
			for (var field in snapshot.val()[timestamp]) {
				temp.push(snapshot.val()[timestamp][field])
			}
			wheelchairsArray.push(temp)
			this.setState({
				wheelchairList: [...this.state.wheelchairList, wheelchairsArray]
			})
		}
	}
	
	componentDidMount() {
		let arrivalRef = firebase.database().ref('/arrival/');
		arrivalRef.on('value', this.onArrivalsChanged.bind(this))

		let departureRef = firebase.database().ref('/departure/');
		departureRef.on('value', this.onDeparturesChanged.bind(this))

		let preboardRef = firebase.database().ref('/preboard/');
		preboardRef.on('value', this.onPreboardsChanged.bind(this))

		let wheelchairRef = firebase.database().ref('/wheelchairs/');
		wheelchairRef.on('value', this.onWheelchairsChanged.bind(this))
		
	}

  render () {
  	console.log(this.state.arrivalList, this.state.departureList, this.state.wheelchairList)
    return (
      <div>
        Table. This is a protected route. You can only see this if you're authed.
       
      </div>
    )
  }
}