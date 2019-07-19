import {
  MODAL_CLOSE,
  MODAL_SHOW,
  POST_MODAL_SHOW,
  INFO_MODAL_SHOW,
  SIGNIN_ON,
  SIGNIN_OFF,
  MODAL_REGISTER_FAIL,
  MODAL_ALERT
} from "./types";

export const modalShow = () => dispatch => {
  dispatch({
    type: MODAL_SHOW
  });
};

export const modalClose = () => dispatch => {
  dispatch({
    type: MODAL_CLOSE
  });
};

export const postModalShow = () => dispatch => {
  dispatch({
    type: POST_MODAL_SHOW
  });
};

export const infoModalShow = () => dispatch => {
  dispatch({
    type: INFO_MODAL_SHOW
  });
};

export const signInOn = () => dispatch => {
  dispatch({
    type: SIGNIN_ON
  });
};

export const signInOff = () => dispatch => {
  dispatch({
    type: SIGNIN_OFF
  });
};

//Info modal contents
export const modalAlert = () => dispatch => {
  dispatch({
    type: MODAL_ALERT
  });
};

export const modalRegisterFail = () => dispatch => {
  //Register
  dispatch({
    type: MODAL_REGISTER_FAIL
  });
};
