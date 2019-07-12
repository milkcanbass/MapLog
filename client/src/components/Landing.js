import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//component
import MapContainer from "../components/MapComponent";

const Landing = () => {
  return (
    <Fragment>
      <div>
        <MapContainer />
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
