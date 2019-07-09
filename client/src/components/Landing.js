import React, { Fragment } from "react";
import { connect } from "react-redux";
import { register } from "../actions/userAction";
import PropTypes from "prop-types";

import MapContainer from "../components/MapComponent";

import Button from "react-bootstrap/Button";

const Landing = ({ register }) => {
  const onSubmit = e => {
    e.preventDefault();

    register();
  };

  return (
    <Fragment>
      <h1>Map Chat</h1>
      <Button onClick={e => onSubmit(e)}>Hello</Button>
      <Button variant="primary">Primary</Button>
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
