import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//Redux
import { connect } from "react-redux";
import { register } from "../../../actions/userAction";

//Bootstrap
import Form from "react-bootstrap/Form";

const StandardModal = (props, { isAuth, register }) => {
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

  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);

  const onSubmit = async e => {
    e.preventDefault();

    try {
      props.register({ email, name, password });
      // register({ name, email, password });
    } catch (err) {
      console.error(err.message);
    }
  };

  const RegisterModal = () => {
    if (!isAuth) {
      //Register User
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Sign In
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <h4>Centered Modal</h4> */}

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
              </Form.Group>
              <p>
                Didn't register? <span>Sign up</span> here.
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
            </Form>
          </Modal.Body>
          {/* <Modal.Footer>
          <Button onClick={props.onHide} type="submit">
            Submit
          </Button>
        </Modal.Footer> */}
        </Modal>
      );
    } else {
      return (
        //Sing in
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Sign in
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <h4>Centered Modal</h4> */}

            <Form onSubmit={e => onSubmit(e)}>
              <p>
                In IF STATEMENT <span>Sign up</span> here.
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
    }
  };

  const LogoutModal = () => {
    return (
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
              if you want to Sign up Click here <span>Sign up</span> here.
            </p>

            <Button onClick={props.onHide} ß variant="info" size="lg" block>
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

  if (isAuth) {
    return LogoutModal();
  } else {
    return RegisterModal();
  }
};

StandardModal.prototype = {
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
)(StandardModal);
