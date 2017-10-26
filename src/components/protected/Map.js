import React, { Component } from 'react'
import { compose } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import firebase from 'firebase'
import { mapAPIKey } from '../../config/constants';

const wheelchairs = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],                                                                                                                                                         
  [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
  [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
  [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
  [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
  [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
  [91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
];

export default class Map extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      wheelchairs : { map: function () { return 0 } },
      locations : {}
    }

    this.onWheelchairsChanged = this.onWheelchairsChanged.bind(this)
    this.renderButtons = this.renderButtons.bind(this)
  }

  componentDidMount() {
    let wheelchairRef = firebase.database().ref('/wheelchairs/');
    wheelchairRef.on('value', this.onWheelchairsChanged.bind(this))
  }

  onWheelchairsChanged(snapshot) {
    let wheelchairs = {}
    for (var wheelchair in snapshot.val()) {
      wheelchairs[wheelchair] = snapshot.val()[wheelchair]
    }

    let markers = {}
    for (var i in wheelchairs) {
      let locationIndex = wheelchairs[i]['latitude'].toString() + wheelchairs[i]['longitude'].toString()
      if (!markers.hasOwnProperty(locationIndex)) {
        markers[locationIndex] = {}
        markers[locationIndex]['latitude'] = wheelchairs[i]['latitude']
        markers[locationIndex]['longitude'] = wheelchairs[i]['longitude']
        markers[locationIndex]['chairs'] = i.toString()
        markers[locationIndex]['name'] = locationIndex
      } else {
        markers[locationIndex]['chairs'] = markers[locationIndex]['chairs'].toString() + ', ' + i
      }
    }
    this.setState({
      wheelchairs: snapshot.val(),
      locations: markers
    })
  }
  onButtonPress(buttonValue) {
    console.log(buttonValue)
  }

  renderButtons() {
    let views = wheelchairs.map((row, index) => {
      let inputRow = row.map((buttonValue, columnIndex) => {
        return <button
                  type='input'
                  className='btn btn-secondary btn-xl'
                  value={buttonValue}
                  onClick={this.onButtonPress.bind(this, buttonValue)}
                  key={'button-' + columnIndex}
                >
                  {buttonValue}
                </button>
      });
      return <div className='btn-group mr-2' key={'row-' + index}>{inputRow}</div>
    });
    return <div className='bt-toolbar'> {views} </div>;
  }

  render () {
    if(this.state.locations != null) {  
      const MapWithAMarker = compose(
        withScriptjs,
        withGoogleMap
      )(props =>
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{ lat: 33.6762, lng: -117.8675 }}
          // defaultCenter={{ lat: 34.0217574, lng: -118.4045808 }}
        >
          {Object.keys(this.state.locations).map((marker, index) => {
            return ( 
              <Marker
                position={{ lat: this.state.locations[marker]['latitude'], lng: this.state.locations[marker]['longitude'] }}
                label={this.state.locations[marker]['chairs'].toString()}
                key={index}
              />
            )
          })}
        </GoogleMap>

      );
      return (
        <div>
          <div style={{float: `left`, width: `450px`}} >
            {this.renderButtons()}
          </div>
          <MapWithAMarker
            // style={{float: `right`}}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapAPIKey}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `800px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      )
    }
  }
}