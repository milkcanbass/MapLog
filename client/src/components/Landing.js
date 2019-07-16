import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withScriptjs, withGoogleMap } from "react-google-maps";

//component
import MapContainer from "../components/MapComponent";
import MapTest from "../components/MapTest";

const Landing = () => {
  const WrappedMap = withScriptjs(withGoogleMap(MapTest));

  return (
    <Fragment>
      <div>
        {/* <MapContainer /> */}
        <div style={{ width: "100vh", height: "100vh" }}>
          <WrappedMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDKUUexAAJ4p0Mb7zTp-zxpWiwmyiEr-H4"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        {/* <MapTest /> */}
      </div>
    </Fragment>
  );
};

Landing.prototype = {
  register: PropTypes.func.isRequired,
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
)(Landing);
