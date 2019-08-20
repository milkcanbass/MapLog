import React, { Fragment } from "react";
import PropTypes from "prop-types";

//Bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//Redux
import { connect } from "react-redux";
import { modalShow, postModalShow } from "../../actions/modalActions";
import { moveToCurrentLoc, register, logout } from "../../actions/userAction";
import { getAllPost, clearAllPost } from "../../actions/getPostAction";

//css
import "../css/NavbarTop.css";
import Spinner from "react-bootstrap/Spinner";
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
  name,
  logout,
  getAllPost,
  loadingPost
}) => {
  const getPosts = e => {
    e.persist();
    getAllPost();
  };
  const userLogout = () => {
    logout();
    clearAllPost();
  };

  const authNav = (
    <Fragment>
      <Navbar bg="danger" variant="dark">
        <Navbar.Brand className="userName">Hi! {name}</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link onClick={() => userLogout()}>
            <FontAwesomeIcon icon={faSignInAlt} /> Logout
          </Nav.Link>
          {loadingPost ? (
            <Nav.Link>
              <Spinner animation="grow" variant="light" />
            </Nav.Link>
          ) : (
            <Nav.Link onClick={e => getPosts(e)}>
              <FontAwesomeIcon icon={faPlusCircle} />
              Download markers
            </Nav.Link>
          )}

          <Nav.Link onClick={() => moveToCurrentLoc()}>
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
          <Nav.Link onClick={() => moveToCurrentLoc()}>
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
  name: PropTypes.string.isRequired,
  postStatus: PropTypes.bool.isRequired,
  loadAllPost: PropTypes.bool.isRequired,
  modalShow: PropTypes.func.isRequired,
  moveToCurrentLoc: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getAllPost: PropTypes.func.isRequired,
  loadingPost: PropTypes.bool.isRequired,
  allPost: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.userReducer.isAuth,
  postStatus: state.modalReducer.postStatus,
  loadAllPost: state.getPostReducer.loadAllPost,
  allPost: state.getPostReducer.allPost,
  loadingPost: state.getPostReducer.loadingPost,
  name: state.userReducer.name
});

export default connect(
  mapStateToProps,
  {
    modalShow,
    moveToCurrentLoc,
    register,
    logout,
    postModalShow,
    getAllPost,
    clearAllPost
  }
)(NavbarTop);
