import React, { Fragment } from "react";
import { connect } from "react-redux";
import { register } from "../actions/userAction";
import PropTypes from "prop-types";

//component
import MapContainer from "../components/MapComponent";
import Modal from "./layout/Modal/Modal";

import Button from "react-bootstrap/Button";

const Landing = ({ register }) => {
  const onSubmit = e => {
    e.preventDefault();

    register();
  };

  const modalProps = {
    triggerText: "Launch the Modal!"
  };

  const modalContent = (
    <React.Fragment>
      <p>
        Press <code>Esc</code> or click Outside the Modal to exit.
      </p>
      <p>
        Pressing Return also exits the Modal if you haven't changed the focus!
      </p>
    </React.Fragment>
  );

  return (
    <Fragment>
      <h1>Map Chat</h1>
      <Button onClick={e => onSubmit(e)}>Hello</Button>
      <Button variant="primary">Primary</Button>
      <Modal modalProps={modalProps} modalContent={modalContent} />
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
