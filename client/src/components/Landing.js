import React, { Fragment } from "react";
import { connect } from "react-redux";
import { register } from "../actions/userAction";
import PropTypes from "prop-types";

import MapContainer from "../components/MapComponent";

const Landing = ({ register }) => {
  const onSubmit = e => {
    e.preventDefault();

    register();
  };

  return (
    <Fragment>
      <h1>Map Chat</h1>
      <button onClick={e => onSubmit(e)}>Hello</button>
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
  { register }
)(Landing);
