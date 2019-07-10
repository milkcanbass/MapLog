import React, { Component } from "react";

import "../../css/modal_styles.css";
class ModalTrigger extends Component {
  render() {
    return (
      <button
        ref={this.props.buttonRef}
        onClick={this.props.showModal}
        className="modal-button"
      >
        {this.props.triggerText}
      </button>
    );
  }
}

export default ModalTrigger;
