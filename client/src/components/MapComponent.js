import React, { useState, Fragment } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mapStyles = {
  width: "100%",
  height: "100%",
  position: "relative",
  top: "10px"
};

const MapContainer = props => {
  //   const [markes, setMarkes] = useState({
  //     stores: [
  //       { latitude: 47.359423, longitude: -122.021071 },
  //       { latitude: 47.2052192687988, longitude: -121.988426208496 },
  //       { latitude: 47.6307081, longitude: -122.1434325 },
  //       { latitude: 47.3084488, longitude: -122.2140121 },
  //       { latitude: 47.5524695, longitude: -122.0425407 }
  //     ]
  //   });

  //   const displayMarkers = markes.stores.map((mark, index) => {
  //     return (
  //       <Marker
  //         key={index}
  //         id={index}
  //         position={{
  //           lat: mark.latitude,
  //           lng: mark.longitude
  //         }}
  //         onClick={() => console.log("You clicked me!")}
  //       />
  //     );
  //   });

  //   const [infoWindow, setInfoWindow] = useState({
  //     showingInfoWindow: false,
  //     activeMarker: {},
  //     selectedPlace: {}
  //   });

  //   const onMarkerClick = (props, marker, e) => {
  //     console.log("clicked");

  //     setInfoWindow({
  //       selectedPlace: props,
  //       activeMarker: marker,
  //       showingInfoWindow: true
  //     });
  //   };

  //   const onMapClicked = props => {
  //     console.log(props);
  //     if (infoWindow.showingInfoWindow) {
  //       setInfoWindow({
  //         showingInfoWindow: false,
  //         activeMarker: null
  //       });
  //     }
  //   };

  const mClicked = (mapProps, map, clickEvent) => {
    console.log(clickEvent.lat);
  };

  return (
    <Fragment>
      <Map
        className={"map"}
        google={props.google}
        zoom={14}
        style={mapStyles}
        onClick={mClicked}
        // initialCenter={{
        //   lat: props.latitude,
        //   lng: props.longitude
        // }}
        center={{
          lat: props.latitude,
          lng: props.longitude
        }}
      >
        {/* <Marker onClick={onMarkerClick} name={"current location"} />
        <InfoWindow
          marker={infoWindow.activeMarker}
          visible={infoWindow.showingInfoWindow}
        >
          <div>
            <h1>Hello</h1>
          </div>
        </InfoWindow> */}

        <Marker
          position={{ lat: props.latitude, lng: props.longitude }}
          name={"Your position"}
          title={"The marker`s title will appear as a tooltip."}
        />
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
