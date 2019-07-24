import React from "react";
import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";

//Redux
import { connect } from "react-redux";
import { register } from "../../../actions/userAction";
import { signInOn } from "../../../actions/modalActions";

//Bootstrap
import "../../css/addPostModal_styles.css";

const InfoModal = props => {
  switch (props.infomodaltype) {
    case "registerFail":
      return (
        <Modal
          {...props}
          variant="info"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Sorry, cannot registered
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{props.infomodaltext}</p>
          </Modal.Body>
        </Modal>
      );
    case "loginFail":
      return (
        <Modal
          {...props}
          variant="info"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Login failed
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{props.infomodaltext}</p>
          </Modal.Body>
        </Modal>
      );

    case "alert":
      return (
        <Modal
          {...props}
          variant="info"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <p>{props.infomodaltext}</p>
          </Modal.Body>
        </Modal>
      );

    default:
      return null;
  }
};

InfoModal.prototype = {
  postmodalopen: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  infomodaltype: PropTypes.string.isRequired,
  infomodaltext: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    postmodalopen: state.modalReducer.modalOpen,
    isAuth: state.userReducer.isAuth,
    infomodaltype: state.modalReducer.infomodaltype,
    infomodaltext: state.modalReducer.infomodaltext
  };
};

export default connect(
  mapStateToProps,
  { register, signInOn }
)(InfoModal);
