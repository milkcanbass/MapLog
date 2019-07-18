import {
  WINDOW_OPEN,
  WINDOW_CLOSE,
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

export const setSelectedPost = payload => dispatch => {
  console.log(typeof payload);

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
