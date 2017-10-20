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


export default class Map extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      wheelchairs : { map: function () { return 0 } },
      locations : null
    }

    this.onWheelchairsChanged = this.onWheelchairsChanged.bind(this)
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
          <MapWithAMarker
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