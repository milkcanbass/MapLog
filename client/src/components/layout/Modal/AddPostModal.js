import React from "react";
import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";

//Redux
import { connect } from "react-redux";
import { register } from "../../../actions/userAction";
import { signInOn } from "../../../actions/modalActions";

//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import sampleImage from "/Users/shincat/webDevelopment/NodeStudy/SocketPractice/client/src/img/frontend.png";
import "../../css/addPostModal_styles.css";

const AddPostModal = props => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
          <InputGroup className="mb-3">
            <FormControl type="file" />
          </InputGroup>
          <Button>Set Location</Button>
          <Image src={sampleImage} className="imagePreview" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} type="submit">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddPostModal.prototype = {
  postModalOpen: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    postModalOpen: state.modalReducer.modalOpen,
    isAuth: state.userReducer.isAuth
  };
};

export default connect(
  mapStateToProps,
  { register, signInOn }
)(AddPostModal);
