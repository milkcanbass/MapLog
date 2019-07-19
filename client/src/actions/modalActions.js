import {
  MODAL_CLOSE,
  MODAL_SHOW,
  POST_MODAL_SHOW,
  POST_MODAL_CLOSE,
  INFO_MODAL_SHOW,
  INFO_MODAL_CLOSE,
  SIGNIN_ON,
  SIGNIN_OFF
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
export const postModalClose = () => dispatch => {
  console.log("postModalClose trigered");

  dispatch({
    type: POST_MODAL_CLOSE
  });
};
export const infoModalShow = () => dispatch => {
  dispatch({
    type: INFO_MODAL_SHOW
  });
};

export const infoModalClose = () => dispatch => {
  dispatch({
    type: INFO_MODAL_CLOSE
  });
};

export const signInOn = () => dispatch => {
  dispatch({
    type: SIGNIN_ON
  });
};

export const signInOff = () => dispatch => {
  //Register
  dispatch({
    type: SIGNIN_OFF
  });
};
