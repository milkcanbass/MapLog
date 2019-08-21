import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
// import store from "./store";
import { modalClose, infoModalShow } from "./actions/modalActions";
import { loadUser } from "./actions/userAction";
//Components
import Landing from "./components/Landing";
import NavbarTop from "./components/layout/NavbarTop";
import RegiSignInModal from "./components/layout/Modal/RegiSignInModal";
import InfoModal from "./components/layout/Modal/InfoModal";

import { moveToCurrentLoc } from "./actions/userAction";

// //Read Bootstrap css//

import setAuthToken from "./utils/setAuthToken";
import { getAllPost } from "./actions/getPostAction";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = ({
  modalOpen,
  modalClose,
  loadUser,
  isAuth,
  infoModalOpen,
  moveToCurrentLoc,
  getAllPost
}) => {
  useEffect(() => {
    if (localStorage.token) {
      loadUser();
      moveToCurrentLoc();
      getAllPost();
    }
  }, [getAllPost, isAuth, loadUser, moveToCurrentLoc]);

  return (
    <Router>
      <NavbarTop />

      <InfoModal show={infoModalOpen} onHide={modalClose} />
      <RegiSignInModal show={modalOpen} onHide={modalClose} />

      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </Router>
  );
};

App.prototype = {
  modalOpen: PropTypes.bool.isRequired,
  postmodalopen: PropTypes.bool.isRequired,
  modalClose: PropTypes.func.isRequired,
  getAllPost: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  modalOpen: state.modalReducer.modalOpen,
  postmodalopen: state.modalReducer.postmodalopen,
  infoModalOpen: state.modalReducer.infoModalOpen,
  isAuth: state.userReducer.isAuth
});

export default connect(
  mapStateToProps,
  { modalClose, loadUser, infoModalShow, moveToCurrentLoc, getAllPost }
)(App);
