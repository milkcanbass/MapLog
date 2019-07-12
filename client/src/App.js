import React, { useState, useEffect } from "react";
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

//Read Bootstrap css//
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { SSL_OP_LEGACY_SERVER_CONNECT } from "constants";

const App = ({ modalOpen, modalShow, modalClose }) => {
  // const [AmodalShow, setAModalShow] = useState({
  //   modalShow: false
  // });

  // let modalClose = () => setAModalShow({ modalShow: false });

  useEffect(() => {
    console.log({ modalOpen });
  });

  const click = () => {
    console.log({ modalOpen });
  };

  return (
    <Router>
      {modalOpen ? <h1>true</h1> : <h1>false/null</h1>}
      <NavbarTop />
      <ButtonToolbar>
        <Button variant="primary" onClick={modalShow}>
          Launch vertically centered modal
        </Button>

        <StandardModal show={modalOpen} onHide={modalClose} />
      </ButtonToolbar>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/UploadPage" component={UploadPage} />
        <Route exact path="/modal" component={StandardModal} />
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
