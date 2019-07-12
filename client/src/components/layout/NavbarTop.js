import React, { Fragment } from "react";
import PropTypes from "prop-types";

//Bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//Redux
import { connect } from "react-redux";
import { modalShow } from "../../actions/modalActions";
import { moveToCurrentLoc } from "../../actions/userAction";

//css
import "../css/NavbarTop.css";

const NavbarTop = ({ modalShow, moveToCurrentLoc }) => {
  return (
    <Fragment>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">MapLog</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/">Add New Log</Nav.Link>
          <Nav.Link onClick={modalShow}>Register/LogOut</Nav.Link>
          <Nav.Link onClick={moveToCurrentLoc}>ToCurrentLocation</Nav.Link>
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
  { modalShow, moveToCurrentLoc }
)(NavbarTop);
