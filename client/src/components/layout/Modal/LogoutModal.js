import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//Redux
import { connect } from "react-redux";
import { register } from "../../../actions/userAction";

//Bootstrap
import Form from "react-bootstrap/Form";

const LogoutModal = (props, { isAuth, register }) => {
  return (
    //Sing in
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}

        <Form>
          <p>
            Didn't register? <span>Sign up</span> here.
          </p>

          <Button
            onClick={props.onHide}
            type="submit"
            variant="info"
            size="lg"
            block
          >
            Sign In
          </Button>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide} type="submit">
          Submit
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

LogoutModal.prototype = {
  modalOpen: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    modalOpen: state.modalReducer.modalOpen,
    isAuth: state.userReducer.isAuth
  };
};

export default connect(
  mapStateToProps,
  { register }
)(LogoutModal);
