import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//Redux
import { connect } from "react-redux";

class StandardModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// StandardModal.prototype = {
//   modalOpen: PropTypes.bool.isRequired
// };

const mapStateToProps = state => {
  return { modalOpen: state.modalReducer.modalOpen };
};

export default connect(
  mapStateToProps,
  {}
)(StandardModal);
