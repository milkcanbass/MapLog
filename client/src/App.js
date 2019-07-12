import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
// import store from "./store";
import { modalShow, modalClose } from "./actions/modalActions";

//Components
import Landing from "./components/Landing";
import NavbarTop from "./components/layout/NavbarTop";
import UploadPage from "./components/UploadPage";
import StandardModal from "./components/layout/Modal/RegisterModal";

// //Read Bootstrap css//
// import "bootstrap/dist/css/bootstrap.css";

const App = ({ modalOpen, modalClose }) => {
  return (
    <Router>
      <NavbarTop />

      <StandardModal show={modalOpen} onHide={modalClose} />

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/upload" component={UploadPage} />
      </Switch>
    </Router>
  );
};

App.prototype = {
  modalOpen: PropTypes.bool.isRequired,
  modalShow: PropTypes.func.isRequired,
  modalClose: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  modalOpen: state.modalReducer.modalOpen
});

export default connect(
  mapStateToProps,
  { modalShow, modalClose }
)(App);
