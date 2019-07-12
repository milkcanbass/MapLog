import { MODAL_CLOSE, MODAL_SHOW } from "./types";

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
