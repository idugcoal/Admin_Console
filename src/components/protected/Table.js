import React, { PureComponent } from 'react'
import firebase from 'firebase'
import { Grid, AutoSizer } from 'react-virtualized'
import '../../styles/Table.css'
// import cn from 'classnames'

export default class Table extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tableType: 'arrivals',
			arrivalList: [['Airline', 'Comments', 'Dropoff', 'Device ID', 'User', 'Flight', 'P1 First Name', 'P1 Last Name', 'P1 Wheelchair', 'P2 First Name', 'P2 Last Name', 'P2 Wheelchair', 'Start Location', 'Starting GPS', 'Stops', 'End Time', 'Start Time']],
			departureList: [['Airline', 'Final Comments', 'TSA Comments', 'Destination Gate', 'Device ID', 'User', 'Final Gate', 'Flight', 'P1 First Name', 'P1 Last Name', 'P1 Wheelchair', 'P2 First Name', 'P2 Last Name', 'P2 Wheelchair', 'Start Location', 'Starting GPS', 'Stops', 'End Time', 'Start Time', 'TSA Start Time', 'TSA End Time']],
			preboardList: [['Airline', 'Comments', 'Device ID', 'User', 'Flight', 'First Name', 'Last Name', 'Wheelchair', 'Preboard Type', 'Starting Gate', 'End Time', 'Start Time']],
		}

		this.cellRenderer = this.cellRenderer.bind(this);
		this.getColumnWidth = this.getColumnWidth.bind(this);
		this.onArrivalsChanged = this.onArrivalsChanged.bind(this);
		this.onDeparturesChanged = this.onDeparturesChanged.bind(this);
		this.onPreboardsChanged = this.onPreboardsChanged.bind(this);
		this.tableSwitcher = this.tableSwitcher.bind(this);
		this.onButtonPress = this.onButtonPress.bind(this);
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
			temp[13] = JSON.stringify(temp[13])
			//index 14: stops
			let stops = temp[14]
			let stopString = ''
			for (var i = 0; i < stops.length; i++) {
				stopString += 'Stop #' + (i + 1).toString() + '\n'
				stopString += 'Location: ' + stops[i]['stopLocation'] + '\n'
				stopString += 'Latitude: ' + stops[i]['latitude'] + '\n'
				stopString += 'Longitude: ' + stops[i]['longitude'] + '\n'
				stopString += 'Timestamp: ' + stops[i]['timestamp'] + '\n\n'
			}
			
			temp[14] = stopString;
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

	onButtonPress(tableType) {
		// this.setState({
		// 	tableType: tableType
		// })
	}

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

	tableSwitcher() {
		switch(this.state.tableType) {
			case 'arrivals':
				return this.state.arrivalList
			case 'departures':
				return this.state.departureList
			case 'preboards':
				return this.state.preboardList
			default:
				return this.state.arrivalList
		}
	}

	cellRenderer({ columnIndex, key, rowIndex, style }) {
			// console.log(this.tableSwitcher()[rowIndex][columnIndex])
		return ( 
			<div
				key={key}
				style={style}
			>
			
			{this.tableSwitcher()[rowIndex][columnIndex]}
			</div>
		)
	}

  render () {
  	// console.log(this.state.arrivalList)//, this.state.departureList, this.state.wheelchairList)
    if (this.tableSwitcher().length > 0) {
	    return (
	      <div>
	      	<div className="TitleBar">
	        	<button type="input" className="btn btn-primary" onClick={this.onButtonPress('arrivals')}>Arrivals</button>
	        	<button type="input" className="btn btn-primary" onClick={this.onButtonPress('departures')}>Departures</button>
	        	<button type="input" className="btn btn-primary" onClick={this.onButtonPress('preboards')}>Preboards</button>
	        </div>

	        	<AutoSizer disableHeight>
	        		{({width}) => (
			      	  <Grid
				        	cellRenderer={this.cellRenderer}
				        	columnCount={this.tableSwitcher()[0].length}
				        	columnWidth={this.getColumnWidth} 
				        	height={800}
				        	overscanColumnCount={0}
				        	overscanRowCount={0}
				        	rowCount={this.tableSwitcher().length}
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