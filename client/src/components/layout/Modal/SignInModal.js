import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//Redux
import { connect } from "react-redux";
import { register } from "../../../actions/userAction";
import { signInOff } from "../../../actions/modalActions";

//Bootstrap
import Form from "react-bootstrap/Form";

const SignInModal = props => {
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
      // register({ name, email, password });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    console.log(props);
  }, [props]);

  const handler = () => {
    console.log("clicked");

    props.signInOff();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        {/* 
        <Form onSubmit={e => onSubmit(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={e => onChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
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
            />
          </Form.Group> */}
        <p>
          Didn't register?{" "}
          <span onClick={handler} style={{ color: "blue" }}>
            Click here to Sign up.
          </span>
        </p>
        <Button
          // onClick={props.onHide}
          type="submit"
          // onClick={onSubmit()}
          variant="info"
          size="lg"
          block
        >
          Sign In
        </Button>
      </Modal.Body>
      {/* <Modal.Footer>
          <Button onClick={props.onHide} type="submit">
            Submit
          </Button>
        </Modal.Footer> */}
    </Modal>
  );
};

SignInModal.prototype = {
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
  { register, signInOff }
)(SignInModal);
