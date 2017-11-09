import React, { PureComponent } from 'react'
import firebase from 'firebase'
import { Grid, AutoSizer } from 'react-virtualized'
import styles from '../../styles/Table.css'
import cn from 'classnames'

export default class Table extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tableType: 'arrivals',
			arrivalList: [['Airline', 'Comments', 'Dropoff', 'Device ID', 'User', 'Flight', 'P1 First Name', 'P1 Last Name', 'P1 Wheelchair', 'P2 First Name', 'P2 Last Name', 'P2 Wheelchair', 'Start Location', 'Starting GPS', 'Stops', 'End Time', 'Start Time']],
			departureList: [['Airline', 'Final Comments', 'TSA Comments', 'Destination Gate', 'Device ID', 'User', 'Final Gate', 'Flight', 'P1 First Name', 'P1 Last Name', 'P1 Wheelchair', 'P2 First Name', 'P2 Last Name', 'P2 Wheelchair', 'Start Location', 'Starting GPS', 'Stops', 'End Time', 'Start Time', 'TSA Start Time', 'TSA End Time']],
			preboardList: [['Airline', 'Comments', 'Device ID', 'User', 'Flight', 'First Name', 'Last Name', 'Wheelchair', 'Preboard Type', 'Starting Gate', 'End Time', 'Start Time']],
			searchText: ''
		}

		this.cellRenderer = this.cellRenderer.bind(this);
		this.getColumnWidth = this.getColumnWidth.bind(this);
		this.onArrivalsLoaded = this.onArrivalsLoaded.bind(this);
		this.onDeparturesLoaded = this.onDeparturesLoaded.bind(this);
		this.onPreboardsLoaded = this.onPreboardsLoaded.bind(this);
		this.tableSwitcher = this.tableSwitcher.bind(this);
		this.getRowClassName = this.getRowClassName.bind(this);
		this.processGPS = this.processGPS.bind(this);
		this.processStops = this.processStops.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.filterList = this.filterList.bind(this);
	}

	componentDidMount() {
		let arrivalRef = firebase.database().ref('/arrivals/');
		arrivalRef.on('value', this.onArrivalsLoaded);
		// arrivalRef.on('value', () => {console.log('value added')})

		let departureRef = firebase.database().ref('/departures/');
		departureRef.on('value', this.onDeparturesLoaded)

		let preboardRef = firebase.database().ref('/preboards/');
		preboardRef.on('value', this.onPreboardsLoaded)
	}

	processGPS(gps) {
		return <a href={`http://www.google.com/maps/place/${gps.latitude},${gps.longitude}`}> Map </a>
	}

	processStops(s) {
		let stops = s;
		let stopsArray = []
		if(s[0] !== '0') {
			for (var i = 0; i < stops.length; i++) {
				stopsArray.push(<a href={`http://www.google.com/maps/place/${stops[i]['latitude']},${stops[i]['longitude']}`} title={stops[i].timestamp} key={i+stops[i].timestamp}> {stops[i]['stopLocation']} </a>)
			}
		}
		return stopsArray
	}

	onArrivalsLoaded(snapshot) {
		this.setState({ arrivalList: [['Airline', 'Comments', 'Dropoff', 'Device ID', 'User', 'Flight', 'P1 First Name', 'P1 Last Name', 'P1 Wheelchair', 'P2 First Name', 'P2 Last Name', 'P2 Wheelchair', 'Start Location', 'Starting GPS', 'Stops', 'End Time', 'Start Time']] })
		let arrivalsArray = []
		for (var timestamp in snapshot.val()) {
			let temp = [];
			for (var field in snapshot.val()[timestamp]) {
				temp.push(snapshot.val()[timestamp][field])
			}
			temp[13] = this.processGPS(temp[13])
			temp[14] = this.processStops(temp[14]);
			arrivalsArray.push(temp)
			this.setState({
				arrivalList: [...this.state.arrivalList, temp]
			})
		}
	}
	
	onDeparturesLoaded(snapshot) {
		this.setState({ departureList: [['Airline', 'Final Comments', 'TSA Comments', 'Destination Gate', 'Device ID', 'User', 'Final Gate', 'Flight', 'P1 First Name', 'P1 Last Name', 'P1 Wheelchair', 'P2 First Name', 'P2 Last Name', 'P2 Wheelchair', 'Start Location', 'Starting GPS', 'Stops', 'End Time', 'Start Time', 'TSA Start Time', 'TSA End Time']] })
		let departuresArray = []
		for (var timestamp in snapshot.val()) {
			let temp = [];
			for (var field in snapshot.val()[timestamp]) {
				temp.push(snapshot.val()[timestamp][field])
			}
			temp[15] = this.processGPS(temp[15]);
			temp[16] = this.processStops(temp[16]);
			departuresArray.push(temp)
			this.setState({
				departureList: [...this.state.departureList, temp]
			})
		}
	}

	onPreboardsLoaded(snapshot) {
		this.setState({ preboardList: [['Airline', 'Comments', 'Device ID', 'User', 'Flight', 'First Name', 'Last Name', 'Wheelchair', 'Preboard Type', 'Starting Gate', 'End Time', 'Start Time']] })
		let preboardsArray = []
		for (var timestamp in snapshot.val()) {
			let temp = [];
			for (var field in snapshot.val()[timestamp]) {
				temp.push(snapshot.val()[timestamp][field])
			}
			preboardsArray.push(temp)
			this.setState({
				preboardList: [...this.state.preboardList, temp]
			})
		}
	}

	handleChange(s) {
		this.setState({
			searchText: s.target.value
		})
		// setTimeout(() => console.log(this.state.searchText), 1)
		// console.log(this.state.searchText);
		console.log(this.filterList())
	}

	filterList() {
		let list = this.tableSwitcher();
		return list.filter((item, index, array) => {
			if(index === 0) return true
			for(let key in item) {
				if(item[key].toString().search(this.state.searchText) !== -1)
					return true
			}
			return false
		})
	}

	onButtonPress(tableType) {
		this.setState({
			tableType: tableType
		})
	}

	getColumnWidth({index}) {
		// if(this.state.tableType === 'arrivals') {
			switch(index) {
				case 0:
					return 75
				case 5:
					return 75
				case 13:
					return 150
				case 14:
					return 200
				default: 
					return 150
			}
		// } else if (this.state.tableType === 'departures') {
		// 	return 250
		// } else {
		// 	return 250
		// }
		
	}

	getRowClassName(row) {
		if(row === 0) return styles.headerCell
		return row % 2 === 0 ? styles.evenRow : styles.oddRow;
	}

	getColumnClassName(column) {
		if(column === 13) return styles.gps
		if(column === 14) return styles.stops
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
		const rowClass = this.getRowClassName(rowIndex);
		const columnClass = this.getColumnClassName(columnIndex)
		const classNames = cn(rowClass, columnClass, styles.cell, {
      [styles.centeredCell]: columnIndex > 2,
    });
		
		return ( 
			<div
				className={classNames}
				key={key}
				style={style}
			>
			
			{this.tableSwitcher()[rowIndex][columnIndex]}
			</div>
		)
	}

  render () {
    if (this.tableSwitcher().length > 0) {
	    return (
	      <div>
	      	<div className={styles.TitleBar}>
	        	<button type="input" className="btn btn-primary" onClick={this.onButtonPress.bind(this, 'arrivals')}>Arrivals</button>
	        	<button type="input" className="btn btn-primary" onClick={this.onButtonPress.bind(this, 'departures')}>Departures</button>
	        	<button type="input" className="btn btn-primary" onClick={this.onButtonPress.bind(this, 'preboards')}>Preboards</button>
	        	<span className={styles.TableType}>{this.state.tableType}
	        	<input type="text" placeholder="Search..." value={this.state.searchText} onChange={this.handleChange} /></span>
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
				        	rowHeight={60}
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