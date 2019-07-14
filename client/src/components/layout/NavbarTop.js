import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";

//Bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//Redux
import { connect } from "react-redux";
import { modalShow, postModalShow } from "../../actions/modalActions";
import { moveToCurrentLoc, register, logout } from "../../actions/userAction";

//css
import "../css/NavbarTop.css";

import {
  faMapMarkedAlt,
  faSignInAlt,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavbarTop = ({
  modalShow,
  moveToCurrentLoc,
  isAuth,
  logout,
  postModalShow
}) => {
  const authNav = (
    <Fragment>
      <Navbar bg="danger" variant="dark">
        <Navbar.Brand href="/">MapLog</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link onClick={logout}>
            <FontAwesomeIcon icon={faSignInAlt} /> Logout
          </Nav.Link>
          <Nav.Link onClick={postModalShow}>
            <FontAwesomeIcon icon={faPlusCircle} /> Add Log
          </Nav.Link>
          <Nav.Link onClick={moveToCurrentLoc}>
            <FontAwesomeIcon icon={faMapMarkedAlt} /> Your Location
          </Nav.Link>
        </Nav>
      </Navbar>
    </Fragment>
  );

  const noAuthNav = (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">MapLog</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link onClick={modalShow}>
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Nav.Link>
          <Nav.Link onClick={moveToCurrentLoc}>
            <FontAwesomeIcon icon={faMapMarkedAlt} /> Your Location
          </Nav.Link>
        </Nav>
      </Navbar>
    </Fragment>
  );

  return <Fragment>{isAuth ? authNav : noAuthNav}</Fragment>;
};

NavbarTop.prototype = {
  isAuth: PropTypes.bool.isRequired,
  postStatus: PropTypes.bool.isRequired,
  modalShow: PropTypes.func.isRequired,
  moveToCurrentLoc: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.userReducer.isAuth,
  postStatus: state.modalReducer.postStatus
});

export default connect(
  mapStateToProps,
  { modalShow, moveToCurrentLoc, register, logout, postModalShow }
)(NavbarTop);
