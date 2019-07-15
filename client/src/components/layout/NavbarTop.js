import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";

//Bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//Redux
import { connect } from "react-redux";
import { modalShow, postModalShow } from "../../actions/modalActions";
import { moveToCurrentLoc, register, logout } from "../../actions/userAction";
import { getAllPost } from "../../actions/getPostAction";

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
  allPost,
  loadAllPost,
  logout,
  getAllPost
}) => {
  const clickme = e => {
    e.persist();
    console.log("clicked");

    getAllPost();
  };

  useEffect(() => {
    console.log(allPost);
  }, [allPost]);

  const authNav = (
    <Fragment>
      <Navbar bg="danger" variant="dark">
        <Navbar.Brand href="/">MapLog</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link onClick={logout}>
            <FontAwesomeIcon icon={faSignInAlt} /> Logout
          </Nav.Link>
          {/* <Nav.Link onClick={postModalShow}>
            <FontAwesomeIcon icon={faPlusCircle} /> Add Log
          </Nav.Link> */}
          <Nav.Link onClick={e => clickme(e)}>
            <FontAwesomeIcon icon={faPlusCircle} />
            Download markers
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

  return (
    <Fragment>
      {isAuth ? authNav : noAuthNav}
      {loadAllPost
        ? allPost.map((post, i) => {
            return (
              <Fragment>
                <h1>{post.metadata.title}</h1>
              </Fragment>
            );
          })
        : null}
    </Fragment>
  );
};

NavbarTop.prototype = {
  isAuth: PropTypes.bool.isRequired,
  postStatus: PropTypes.bool.isRequired,
  loadAllPost: PropTypes.bool.isRequired,
  modalShow: PropTypes.func.isRequired,
  moveToCurrentLoc: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getAllPost: PropTypes.func.isRequired,
  allPost: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.userReducer.isAuth,
  postStatus: state.modalReducer.postStatus,
  loadAllPost: state.getPostReducer.loadAllPost,
  allPost: state.getPostReducer.allPost
});

export default connect(
  mapStateToProps,
  { modalShow, moveToCurrentLoc, register, logout, postModalShow, getAllPost }
)(NavbarTop);
