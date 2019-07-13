import { MODAL_CLOSE, MODAL_SHOW, SIGNIN_ON, SIGNIN_OFF } from "./types";

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
