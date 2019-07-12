import React, { Fragment } from "react";
import PropTypes from "prop-types";

//Bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//Redux
import { connect } from "react-redux";
import { modalShow } from "../../actions/modalActions";
import { moveToCurrentLoc } from "../../actions/userAction";
import { register } from "../../actions/userAction";

//css
import "../css/NavbarTop.css";

import {
  faMapMarkedAlt,
  faSignInAlt,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavbarTop = ({ modalShow, moveToCurrentLoc }) => {
  return (
    <Fragment>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">MapLog</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link onClick={modalShow}>
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Nav.Link>
          <Nav.Link href="/">
            <FontAwesomeIcon icon={faPlusCircle} /> Add Log
          </Nav.Link>
          <Nav.Link onClick={moveToCurrentLoc}>
            <FontAwesomeIcon icon={faMapMarkedAlt} /> Your Location
          </Nav.Link>
        </Nav>
      </Navbar>
    </Fragment>
  );
};

NavbarTop.prototype = {
  modalShow: PropTypes.func.isRequired
};

export default connect(
  null,
  { modalShow, moveToCurrentLoc, register }
)(NavbarTop);
