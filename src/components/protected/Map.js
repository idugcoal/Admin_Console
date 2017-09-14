import React, { Component } from 'react'
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

export default class Map extends Component {

  render () {
    const MapWithAMarker = compose(
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 33.6762, lng: -117.8675 }}
      >
        <Marker
          position={{ lat: -34.397, lng: 150.644 }}
        />
      </GoogleMap>
    );
    return (
      <div>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `800px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}