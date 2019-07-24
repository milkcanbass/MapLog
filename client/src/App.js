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
import StandardModal from "./components/layout/Modal/StandardModal";
import AddPostModal from "./components/layout/Modal/AddPostModal";
import InfoModal from "./components/layout/Modal/InfoModal";

// //Read Bootstrap css//

import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = ({
  modalOpen,
  modalClose,
  postmodalopen,
  loadUser,
  infoModalOpen
}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Router>
      <NavbarTop />

      <InfoModal show={infoModalOpen} onHide={modalClose} />

      <AddPostModal show={postmodalopen} onHide={modalClose} />
      <StandardModal show={modalOpen} onHide={modalClose} />

      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </Router>
  );
};

App.prototype = {
  modalOpen: PropTypes.bool.isRequired,
  postmodalopen: PropTypes.bool.isRequired,
  modalClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalOpen: state.modalReducer.modalOpen,
  postmodalopen: state.modalReducer.postmodalopen,
  infoModalOpen: state.modalReducer.infoModalOpen
});

export default connect(
  mapStateToProps,
  { modalClose, loadUser, infoModalShow }
)(App);
