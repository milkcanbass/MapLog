import {
  MODAL_CLOSE,
  MODAL_SHOW,
  POST_MODAL_SHOW,
  POST_MODAL_CLOSE,
  POST_ABLE,
  POST_DISABLE,
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
  dispatch({
    type: POST_MODAL_CLOSE
  });
  dispatch({
    type: POST_DISABLE
  });
};
export const postAble = payload => dispatch => {
  dispatch({
    type: POST_ABLE
  });
  dispatch({
    type: POST_MODAL_SHOW
  });
};

export const postDisable = payload => dispatch => {
  dispatch({
    type: POST_DISABLE
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
