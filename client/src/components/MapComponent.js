import React, { useState, Fragment, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import img from "../img/frontend.png";

//Since react-maps-react library doesn't support to attach event handler to InforWindow dynamic content.
//To solve this, render InfoWindow children into a DOM node in order to prevent losing React Context.

import InfoWindowEx from "./layout/InfoWindowEx";
import { postAble } from "../actions/userAction";

const mapStyles = {
  width: "100%",
  height: "100%",
  position: "relative"
  // top: "100px"
  // borderRadius: "5%"
};
const imgStyle = {
  maxWidth: "400px",
  minWidth: "200px",
  maxHeight: "auto"
};

const infoWindowStyle = {
  maxWidth: "400px",
  minWidth: "200px",
  height: "auto"
};

const button = {
  background: "#3498db",
  maxWidth: "400px",
  padding: "15px 100px",
  position: "relative",
  margin: "10px 0",
  borderRadius: "3px"
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

  const [textAreaState, setTextAreaState] = useState({ textArea: "" });

  //Add marker
  //  useEffect(() =>{
  //    document.getElementById("test").setAttribute()
  //  })

  const onMapClicked = (props, map, clickEvent) => {
    console.log(props);
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
  console.log(props.postStatus);

  return (
    <Fragment>
      <Map
        className={"map"}
        google={props.google}
        zoom={14}
        style={mapStyles}
        onClick={props.postStatus ? onMapClicked : null}
        disabled="true"
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
        <InfoWindowEx
          marker={infoWindowState.activeMarker}
          visible={infoWindowState.showingInfoWindow}
        >
          <div style={infoWindowStyle}>
            <center>
              <h1>{markerState.title}</h1>
              <p>updated:2019 12/12</p>
              <div>
                <p>
                  <img src={img} className="img" style={imgStyle} />
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum."
                </p>
              </div>

              <button type="button" style={button}>
                <a href={`mailto:${markerState.name}`}>Send mail</a>
              </button>
            </center>
          </div>
        </InfoWindowEx>
      </Map>
    </Fragment>
  );
};

MapContainer.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  postStatus: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  latitude: state.userReducer.latitude,
  longitude: state.userReducer.longitude,
  postStatus: state.userReducer.postStatus
});

export default connect(
  mapStateToProps,
  {}
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyDKUUexAAJ4p0Mb7zTp-zxpWiwmyiEr-H4"
  })(MapContainer)
);
