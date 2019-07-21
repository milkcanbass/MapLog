import {
  GETALLPOST_SUCCESS,
  GETALLPOST_FAIL,
  GETIMG_SUCCESS,
  GETIMG_FAIL,
  CLEAR_ALL_POST,
  BINDSFLAG_ON,
  BINDSFLAG_OFF
} from "./types";
import axios from "axios";
import store from "../store";

export const getAllPost = () => async dispatch => {
  try {
    const state = store.getState();
    const id = state.userReducer.id;

    const res = await axios.get("api/post/files", {
      params: {
        id: id
      }
    });
    dispatch({
      type: BINDSFLAG_ON
    });
    await dispatch({ type: GETALLPOST_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err.message);
    await dispatch({ type: GETALLPOST_FAIL });
  }
};

export const requestImg = filename => async dispatch => {
  try {
    const res = await axios({
      method: "get",
      url: "/api/post//getImg",
      responseType: "stream",
      params: {
        filename
      }
    });

    await dispatch({ type: GETIMG_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err.message);

    dispatch({ type: GETIMG_FAIL });
  }
};

export const clearAllPost = () => dispatch => {
  dispatch({
    type: CLEAR_ALL_POST
  });
};
export const bindsFlagOn = () => dispatch => {
  dispatch({
    type: BINDSFLAG_ON
  });
};
export const bindsFlagOff = () => dispatch => {
  dispatch({
    type: BINDSFLAG_OFF
  });
};
