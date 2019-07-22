import {
  WINDOW_OPEN,
  WINDOW_CLOSE,
  POST_WINDOW_OPEN,
  POST_WINDOW_CLOSE,
  SET_SELECTED_POST,
  OFF_SELECTED_POST
} from "./types";

export const windowOpen = () => dispatch => {
  console.log("widowOpen activated");
  dispatch({
    type: WINDOW_OPEN
  });
};
export const windowClose = () => dispatch => {
  console.log("widowClose activated");
  dispatch({
    type: WINDOW_CLOSE
  });
};

export const postWindowClose = () => dispatch => {
  console.log("widowClose activated");
  dispatch({
    type: POST_WINDOW_CLOSE
  });
};

export const postWindowOpen = () => dispatch => {
  console.log("widowOpen activated");
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
  console.log("widowOpen activated");
  dispatch({
    type: OFF_SELECTED_POST
  });
};
