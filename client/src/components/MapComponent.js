import React, { useState, Fragment } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import img from "../img/frontend.png";

const mapStyles = {
  width: "100%",
  height: "100%",
  position: "relative",
  top: "10px"
};

//Get lat and lng by clicking map
const MapContainer = props => {
  const [markerState, setMakerState] = useState({
    title: "",
    name: "",
    lat: null,
    lng: null
  });

  const [infoWindowState, setInfoWindowState] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  });

  const onMarkerClick = (props, marker, e) => {
    console.log({ marker });
    console.log({ e });

    setInfoWindowState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  //Add marker
  const onMapClicked = (props, map, clickEvent) => {
    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log({ lat, lng });
    setMakerState({
      title: "Title",
      name: "Name",
      lat,
      lng
    });
    if (infoWindowState.showingInfoWindow) {
      setInfoWindowState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  return (
    <Fragment>
      <Map
        className={"map"}
        google={props.google}
        zoom={14}
        style={mapStyles}
        onClick={onMapClicked}
        // onClick={mapClicked}
        initialCenter={{
          lat: props.latitude,
          lng: props.longitude
        }}
        center={{
          lat: props.latitude,
          lng: props.longitude
        }}
      >
        <Marker
          position={{ lat: markerState.lat, lng: markerState.lng }}
          // name={markerState.name}
          // title={markerState.title}
          onClick={onMarkerClick}
        />
        <InfoWindow
          marker={infoWindowState.activeMarker}
          visible={infoWindowState.showingInfoWindow}
        >
          <div>
            <center>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <img src={img} />
              <input type="text" />
            </center>
          </div>
        </InfoWindow>
      </Map>
    </Fragment>
  );
};

MapContainer.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  latitude: state.userReducer.latitude,
  longitude: state.userReducer.longitude
});

export default connect(
  mapStateToProps,
  {}
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyDKUUexAAJ4p0Mb7zTp-zxpWiwmyiEr-H4"
  })(MapContainer)
);
