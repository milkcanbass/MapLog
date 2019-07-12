import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";

//Bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//Redux
import { connect } from "react-redux";
import { modalShow } from "../../actions/modalActions";

//css
import "../css/NavbarTop.css";

const NavbarTop = ({ modalShow, modalOpen }) => {
  useEffect(() => {
    console.log({ modalOpen });
  });

  return (
    <Fragment>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">MapLog</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link onClick={modalShow}>Register/LogOut</Nav.Link>
          <Nav.Link href="/add">Add New Log</Nav.Link>
        </Nav>
      </Navbar>
    </Fragment>
  );
};

NavbarTop.prototype = {
  modalShow: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  modalOpen: state.modalReducer.modalOpen
});

export default connect(
  mapStateToProps,
  { modalShow }
)(NavbarTop);
