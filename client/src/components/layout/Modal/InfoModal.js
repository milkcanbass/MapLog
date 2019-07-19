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
  switch (props.infoModalType) {
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
            <p>{props.infoModalText}</p>
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
            <p>{props.infoModalText}</p>
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
            <p>{props.infoModalText}</p>
          </Modal.Body>
        </Modal>
      );

    default:
      return null;
  }
};

InfoModal.prototype = {
  postModalOpen: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  infoModalType: PropTypes.string.isRequired,
  infoModalText: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    postModalOpen: state.modalReducer.modalOpen,
    isAuth: state.userReducer.isAuth,
    infoModalType: state.modalReducer.infoModalType,
    infoModalText: state.modalReducer.infoModalText
  };
};

export default connect(
  mapStateToProps,
  { register, signInOn }
)(InfoModal);
