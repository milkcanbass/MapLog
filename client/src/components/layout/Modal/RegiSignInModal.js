import React from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";

import RegisterModal from "./RegisterModal";
import SignInModal from "./SignInModal";

const RegiSignInModal = props => {
  if (props.signInOn) {
    return <SignInModal {...props} />;
  } else {
    return <RegisterModal {...props} />;
  }
};

RegiSignInModal.prototype = {
  isAuth: PropTypes.bool.isRequired,
  signInOn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.userReducer.isAuth,
  signInOn: state.modalReducer.signInOn
});

export default connect(
  mapStateToProps,
  {}
)(RegiSignInModal);
