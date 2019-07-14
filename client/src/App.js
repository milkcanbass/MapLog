import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
// import store from "./store";
import {
  modalShow,
  modalClose,
  postModalShow,
  postModalClose
} from "./actions/modalActions";
import { loadUser } from "./actions/userAction";
//Components
import Landing from "./components/Landing";
import NavbarTop from "./components/layout/NavbarTop";
import StandardModal from "./components/layout/Modal/StandardModal";
import AddPostModal from "./components/layout/Modal/AddPostModal";

// //Read Bootstrap css//
// import "bootstrap/dist/css/bootstrap.css";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = ({
  modalOpen,

  modalClose,

  postModalOpen,

  loadUser
}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <Router>
      <NavbarTop />

      <AddPostModal show={postModalOpen} onHide={modalClose} />

      <StandardModal show={modalOpen} onHide={modalClose} />

      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </Router>
  );
};

App.prototype = {
  modalOpen: PropTypes.bool.isRequired,
  modalShow: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalOpen: state.modalReducer.modalOpen,
  postModalOpen: state.modalReducer.postModalOpen
});

export default connect(
  mapStateToProps,
  { modalShow, modalClose, postModalShow, loadUser }
)(App);
