import {
  WINDOW_OPEN,
  WINDOW_CLOSE,
  POST_WINDOW_OPEN,
  POST_WINDOW_CLOSE,
  SET_SELECTED_POST,
  OFF_SELECTED_POST
} from "./types";

import store from "../store";
import { offBond } from "./getPostAction";

export const windowOpen = () => dispatch => {
  store.dispatch(offBond());
  dispatch({
    type: WINDOW_OPEN
  });
};
export const windowClose = () => dispatch => {
  dispatch({
    type: WINDOW_CLOSE
  });
};

export const postWindowClose = () => dispatch => {
  dispatch({
    type: POST_WINDOW_CLOSE
  });
};

export const postWindowOpen = () => dispatch => {
  store.dispatch(offBond());
  dispatch({
    type: POST_WINDOW_OPEN
  });
};

export const setSelectedPost = payload => dispatch => {
  dispatch({
    type: SET_SELECTED_POST,
    payload: payload
  });
};

export const offSelectedPost = () => dispatch => {
  dispatch({
    type: OFF_SELECTED_POST
  });
};
