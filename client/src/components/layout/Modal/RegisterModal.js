import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//Redux
import { connect } from "react-redux";
import { register } from "../../../actions/userAction";
import { signInOn } from "../../../actions/modalActions";

//Bootstrap
import Form from "react-bootstrap/Form";

const RegisterModal = props => {
  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { name, email, password } = inputState;

  const onChange = e => {
    e.persist();
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async e => {
    e.preventDefault();

    try {
      props.register({ email, name, password });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handler = () => {
    props.signInOn();
  };

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
        <Form onSubmit={e => onSubmit(e)} autoComplete="off">
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              required
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
              autoComplete="off"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              required
              autoComplete="off"
            />
          </Form.Group>
          <p>
            Have an account?{" "}
            <span onClick={handler} style={{ color: "blue" }}>
              Click here to Sign in
            </span>
            .
          </p>
          <Button type="submit" variant="info" size="lg" block>
            Sign up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

RegisterModal.prototype = {
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
  { register, signInOn }
)(RegisterModal);
