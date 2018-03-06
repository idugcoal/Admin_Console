import React, { PureComponent } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import firebase from 'firebase'
import { arrivalList, departureList, preboardList, transferList } from '../../config/constants';

export default class Table2 extends PureComponent {
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

    this.onArrivalsLoaded = this.onArrivalsLoaded.bind(this);
    this.onDeparturesLoaded = this.onDeparturesLoaded.bind(this);
    this.onPreboardsLoaded = this.onPreboardsLoaded.bind(this);
    this.onTransfersLoaded = this.onTransfersLoaded.bind(this);
    this.processGPS = this.processGPS.bind(this);
    this.processStops = this.processStops.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterList = this.filterList.bind(this);
    this.tableSwitcher = this.tableSwitcher.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  componentDidMount() {
    let arrivalRef = firebase.database().ref('/arrivals/');
    arrivalRef.once('value', this.onArrivalsLoaded);
    console.log('yo')

    // let departureRef = firebase.database().ref('/departures/');
    // departureRef.on('value', this.onDeparturesLoaded)

    // let preboardRef = firebase.database().ref('/preboards/');
    // preboardRef.on('value', this.onPreboardsLoaded)

    // let transferRef = firebase.database().ref('/transfers/');
    // transferRef.on('value', this.onTransfersLoaded)
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
      temp[13] = 'a' //this.processGPS(temp[13])
      temp[14] = 'b' //this.processStops(temp[14]);
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

  render () {
    if (this.tableSwitcher().length > 1) {
    console.log(this.tableSwitcher())
      return (
        <ReactTable>
          data={this.tableSwitcher()}
        </ReactTable>
      )
    } else {
      return <div> Loading...</div>
    }
  }
}