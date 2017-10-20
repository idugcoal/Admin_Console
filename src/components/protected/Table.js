import React, { PureComponent } from 'react'
import firebase from 'firebase'
import { Grid, AutoSizer } from 'react-virtualized'
// import styles from '../../styles/Table.css'
// import cn from 'classnames'

export default class Table extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			arrivalList: [['Airline', 'Comments', 'Dropoff', 'Device ID', 'User', 'Flight', 'P1 First Name', 'P1 Last Name', 'P1 Wheelchair', 'P2 First Name', 'P2 Last Name', 'P2 Wheelchair', 'Start Location', 'Starting GPS', 'Stops', 'End Time', 'Start Time']],
			departureList: [['Airline', 'Final Comments', 'TSA Comments', 'Destination Gate', 'Device ID', 'User', 'Final Gate', 'Flight', 'P1 First Name', 'P1 Last Name', 'P1 Wheelchair', 'P2 First Name', 'P2 Last Name', 'P2 Wheelchair', 'Start Location', 'Starting GPS', 'Stops', 'End Time', 'Start Time', 'TSA Start Time', 'TSA End Time']],
			preboardList: [['Airline', 'Comments', 'Device ID', 'User', 'Flight', 'First Name', 'Last Name', 'Wheelchair', 'Preboard Type', 'Starting Gate', 'End Time', 'Start Time']],
		}

		this.cellRenderer = this.cellRenderer.bind(this);
		this.getColumnWidth = this.getColumnWidth.bind(this);
		this.onArrivalsChanged = this.onArrivalsChanged.bind(this);
		this.onDeparturesChanged = this.onDeparturesChanged.bind(this);
		this.onPreboardsChanged = this.onPreboardsChanged.bind(this)
	}

	componentDidMount() {
		let arrivalRef = firebase.database().ref('/arrivals/');
		arrivalRef.once('value', this.onArrivalsChanged)

		let departureRef = firebase.database().ref('/departures/');
		departureRef.once('value', this.onDeparturesChanged)

		let preboardRef = firebase.database().ref('/preboards/');
		preboardRef.once('value', this.onPreboardsChanged)
	}

	onArrivalsChanged(snapshot) {
		let arrivalsArray = []
		for (var timestamp in snapshot.val()) {
			let temp = [];
			for (var field in snapshot.val()[timestamp]) {
				temp.push(snapshot.val()[timestamp][field])
			}
			//index 13: start location info
			//index 14: stops
			temp[13] = JSON.stringify(temp[13])
			temp[14] = JSON.stringify(temp[14])
			arrivalsArray.push(temp)
			this.setState({
				arrivalList: [...this.state.arrivalList, temp]
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

	// onWheelchairsChanged(snapshot) {
	// 	let wheelchairsArray = []
	// 	for (var timestamp in snapshot.val()) {
	// 		let temp = [];
	// 		for (var field in snapshot.val()[timestamp]) {
	// 			temp.push(snapshot.val()[timestamp][field])
	// 		}
	// 		wheelchairsArray.push(temp)
	// 		this.setState({
	// 			wheelchairList: [...this.state.wheelchairList, wheelchairsArray]
	// 		})
	// 	}
	// }
	getColumnWidth({index}) {
		switch(index) {
			case 0:
				return 75
			case 5:
				return 75
			case 13:
				return 650
			case 14:
				return 1000
			default: 
				return 150
		}
	}

	cellRenderer({ columnIndex, key, rowIndex, style }) {
		// console.log(this.state.arrivalList[rowIndex][columnIndex])
		return ( 
			<div
				key={key}
				style={style}
			>
			
			{this.state.arrivalList[rowIndex][columnIndex]}
			</div>
		)
	}

  render () {
  	// console.log(this.state.arrivalList)//, this.state.departureList, this.state.wheelchairList)
    if (this.state.arrivalList.length > 0) {
	    return (
	      <div>
	      	<div>
	        	Arrivals | Departures | Preboards
	        </div>

	        	<AutoSizer disableHeight>
	        		{({width}) => (
			      	  <Grid
				        	cellRenderer={this.cellRenderer}
				        	columnCount={18}
				        	columnWidth={this.getColumnWidth} 
				        	height={800}
				        	overscanColumnCount={0}
				        	overscanRowCount={0}
				        	rowCount={this.state.arrivalList.length}
				        	rowHeight={30}
				        	width={width} />
	        		)}
	        		</AutoSizer>
	      </div>
	    )
	  } else {
	  	return <div> Loading...</div>
	  }
  }
}