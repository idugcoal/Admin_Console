import React, { PureComponent } from 'react'
import firebase from 'firebase'
import { MultiGrid, AutoSizer } from 'react-virtualized'
import { arrivalList, departureList, preboardList, transferList } from '../../config/constants';
import styles from '../../styles/Table.css'
import cn from 'classnames'

export default class Table extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tableType: 'arrivals',
			searchText: '',
			arrivalList,
			departureList,
			preboardList,
			transferList
		}

		this.cellRenderer = this.cellRenderer.bind(this);
		this.getColumnWidth = this.getColumnWidth.bind(this);
		this.onArrivalsLoaded = this.onArrivalsLoaded.bind(this);
		this.onDeparturesLoaded = this.onDeparturesLoaded.bind(this);
		this.onPreboardsLoaded = this.onPreboardsLoaded.bind(this);
		this.onTransfersLoaded = this.onTransfersLoaded.bind(this);
		this.tableSwitcher = this.tableSwitcher.bind(this);
		this.getRowClassName = this.getRowClassName.bind(this);
		this.processGPS = this.processGPS.bind(this);
		this.processStops = this.processStops.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.filterList = this.filterList.bind(this);
		this.getActiveButton = this.getActiveButton.bind(this);
	}

	shouldComponentUpdate() {
		return true
	}

	componentDidMount() {
		let arrivalRef = firebase.database().ref('/arrivals/');
		arrivalRef.on('value', this.onArrivalsLoaded);

		let departureRef = firebase.database().ref('/departures/');
		departureRef.on('value', this.onDeparturesLoaded)

		let preboardRef = firebase.database().ref('/preboards/');
		preboardRef.on('value', this.onPreboardsLoaded)

		let transferRef = firebase.database().ref('/transfers/');
		transferRef.on('value', this.onTransfersLoaded)
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
		for (var timestamp in snapshot.val()) {
			let temp = [];
			for (var field in snapshot.val()[timestamp]) {
				temp.push(snapshot.val()[timestamp][field])
			}
			temp[13] = this.processGPS(temp[13])
			temp[14] = this.processStops(temp[14]);
			this.setState({
				arrivalList: [...this.state.arrivalList, temp]
			})
		}
	}
	
	onDeparturesLoaded(snapshot) {
		this.setState({ departureList: [['Airline', 'Final Comments', 'TSA Comments', 'Destination Gate', 'Device ID', 'User', 'Final Gate', 'Flight', 'P1 First Name', 'P1 Last Name', 'P1 Wheelchair', 'P2 First Name', 'P2 Last Name', 'P2 Wheelchair', 'Start Location', 'Starting GPS', 'Stops', 'End Time', 'Start Time', 'TSA Start Time', 'TSA End Time']] })
		for (var timestamp in snapshot.val()) {
			let temp = [];
			for (var field in snapshot.val()[timestamp]) {
				temp.push(snapshot.val()[timestamp][field])
			}
			temp[15] = this.processGPS(temp[15]);
			temp[16] = this.processStops(temp[16]);
			this.setState({
				departureList: [...this.state.departureList, temp]
			})
		}
	}

	onPreboardsLoaded(snapshot) {
		this.setState({ preboardList: [['Airline', 'Comments', 'Device ID', 'User', 'Flight', 'First Name', 'Last Name', 'Wheelchair', 'Preboard Type', 'Starting Gate', 'End Time', 'Start Time']] })
		for (var timestamp in snapshot.val()) {
			let temp = [];
			for (var field in snapshot.val()[timestamp]) {
				temp.push(snapshot.val()[timestamp][field])
			}
			this.setState({
				preboardList: [...this.state.preboardList, temp]
			})
		}
	}

	onTransfersLoaded(snapshot) {
		this.setState({ transferList: [['Airline', 'Comments', 'Device ID', 'User', 'Ending Gate', 'Flight', 'First Name', 'Last Name', 'Wheelchair', 'Starting Gate', 'End Time', 'Start Time']] })
		for (var timestamp in snapshot.val()) {
			let temp = [];
			for (var field in snapshot.val()[timestamp]) {
				temp.push(snapshot.val()[timestamp][field])
			}
			this.setState({
				transferList: [...this.state.transferList, temp]
			})
		}
	}

	handleChange(e) {
		this.setState({
			searchText: e.target.value
		})
	}

	onButtonPress(tableType) {
		this.setState({
			tableType: tableType
		})
	}

	tableSwitcher() {
		switch(this.state.tableType) {
			case 'arrivals':
				return this.filterList(this.state.searchText, this.state.arrivalList)
			case 'departures':
				return this.filterList(this.state.searchText, this.state.departureList)
			case 'preboards':
				return this.filterList(this.state.searchText, this.state.preboardList)
			case 'transfers':
				return this.filterList(this.state.searchText, this.state.transferList)
			default:
				return this.filterList(this.state.searchText, this.state.arrivalList)
		}
	}

	filterList(searchText, list) {
		return list.filter((row, index) => {
			if(index === 0) return true
			for(let column in row) {
				let cell = row[column]
				if(cell.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
					return true;
				}
			}
			return false;
		})
	}

	getColumnWidth({index}) {
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
	}

	getActiveButton() {
		
	}

	getRowClassName(row) {
		if(row === 0) return styles.headerCell
		return row % 2 === 0 ? styles.evenRow : styles.oddRow;
	}

	getColumnClassName(column) {
		if(column === 13) return styles.gps
		if(column === 14) return styles.stops
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
	        	<button type="input" className={styles.btn} onClick={this.onButtonPress.bind(this, 'arrivals')}>Arrivals</button>
	        	<button type="input" className={styles.btn} onClick={this.onButtonPress.bind(this, 'departures')}>Departures</button>
	        	<button type="input" className={styles.btn} onClick={this.onButtonPress.bind(this, 'preboards')}>Preboards</button>
	        	<button type="input" className={styles.btn} onClick={this.onButtonPress.bind(this, 'transfers')}>Transfers</button>
	        	<span className={styles.TableType}>
	        		<input className={styles.Search} type="text" placeholder="Search..." value={this.state.searchText} onChange={this.handleChange} />
	        	</span>
	        </div>
	        	<AutoSizer disableHeight>
	        		{({width}) => (
			      	  <MultiGrid
				        	cellRenderer={this.cellRenderer}
				        	columnCount={this.tableSwitcher()[0].length}
				        	columnWidth={this.getColumnWidth} 
				        	fixedRowCount={1}
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