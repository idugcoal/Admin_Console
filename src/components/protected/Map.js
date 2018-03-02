import React, { Component } from 'react'
import { compose } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import firebase from 'firebase'
import { mapAPIKey, wheelchairs } from '../../config/constants';
import Wheelchairs from '../../styledComponents/Wheelchairs';
import WheelchairButton from '../../styledComponents/WheelchairButton';
import MarkerMap from '../../styledComponents/MarkerMap';
import MapContainer from '../../styledComponents/MapContainer';



export default class Map extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      wheelchairs : {},
      locations : { '0': 'false'},
      active: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
    }

    this.onWheelchairsLoaded = this.onWheelchairsLoaded.bind(this)
    this.combineMarkers = this.combineMarkers.bind(this)
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  componentDidMount() {
    let wheelchairRef = firebase.database().ref('/wheelchairs/');
    wheelchairRef.on('value', this.onWheelchairsLoaded.bind(this))
  }

  combineMarkers(wheelchairs) {
    let markers = {}
    for (var i in wheelchairs) {
      let locationIndex = wheelchairs[i]['latitude'].toString() + wheelchairs[i]['longitude'].toString()
      if (!markers.hasOwnProperty(locationIndex)) {
        markers[locationIndex] = {}
        markers[locationIndex]['latitude'] = wheelchairs[i]['latitude']
        markers[locationIndex]['longitude'] = wheelchairs[i]['longitude']
        markers[locationIndex]['chairs'] = i.toString()
        markers[locationIndex]['name'] = locationIndex
        markers[locationIndex]['chairsArray'] = [i]
      } else {
        markers[locationIndex]['chairs'] = markers[locationIndex]['chairs'].toString() + ', ' + i
        markers[locationIndex]['chairsArray'].push(i)
      }
    }

    return markers;
  }

  onWheelchairsLoaded(snapshot) {
    let wheelchairs = {}
    for (var wheelchair in snapshot.val()) {
      wheelchairs[wheelchair] = snapshot.val()[wheelchair]
    }

    this.setState({
      wheelchairs: snapshot.val(),
      locations: this.combineMarkers(wheelchairs)
    })
  }
  
  onButtonPress(e) {

    let value = e.target.innerHTML
    let temp = [...this.state.active]

    temp[value] = !temp[value]
    
    this.setState({
      active: temp
    })
  }

  render () {
    const buttonList = wheelchairs.map((number, index) => (
      <WheelchairButton 
        key={number}
        onClick={this.onButtonPress}
        >
        {number}
      </WheelchairButton>
    ))

    if(this.state.locations[0] !== 'false') {
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
                  for(let chair of this.state.locations[marker]['chairsArray']) {
                    if(this.state.active[chair]) {
                      return ( 
                        <Marker
                          position={{ lat: parseFloat(this.state.locations[marker]['latitude']), lng: parseFloat(this.state.locations[marker]['longitude']) }}
                          label={this.state.locations[marker]['chairs'].toString()}
                          key={this.state.locations[marker]['name']}
                        />
                      )
                    } else {
                      return <div key={this.state.locations[marker]['name']}/>
                    }
                  }
                  return 0;
                })}
              </GoogleMap>

            );
            return (
              <div>
                <MarkerMap> 
                  <MapWithAMarker
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapAPIKey}`}
                    loadingElement={<MapContainer />}
                    containerElement={<MapContainer />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </MarkerMap>
                <Wheelchairs>
                  {buttonList}
                </Wheelchairs>
              </div>
            )
          } else {
            return <div />
          }
  }
}