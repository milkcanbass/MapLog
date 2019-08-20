import {
  GETALLPOST_SUCCESS,
  GETALLPOST_FAIL,
  GETIMG_SUCCESS,
  GETIMG_FAIL,
  CLEAR_ALL_POST,
  BINDSFLAG_ON,
  BINDSFLAG_OFF,
  GET_NEW_POST_SUCCESS,
  GET_NEW_POST_FAIL,
  LOADING_POST_OFF,
  LOADING_IMG_OFF
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
    console.log(res);
    dispatch({
      type: BINDSFLAG_ON
    });

    await dispatch({ type: GETALLPOST_SUCCESS, payload: res.data });
    await dispatch({ type: LOADING_POST_OFF });
  } catch (err) {
    console.log(err.message);
    await dispatch({ type: GETALLPOST_FAIL });
    await dispatch({ type: LOADING_POST_OFF });
  }
};

export const requestImg = filename => async dispatch => {
  try {
    await dispatch({ type: LOADING_IMG_OFF });
    const res = await axios({
      method: "get",
      url: "/api/post//getImg",
      responseType: "stream",
      params: {
        filename
      }
    });
    console.log(res.data);

    //easy to hit
    // sessionStorage.setItem(filename, res.data);

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

export const getNewPost = () => async dispatch => {
  try {
    const state = store.getState();
    const id = state.userReducer.id;
    const res = await axios.get("api/post/latestFile", {
      params: {
        id: id
      }
    });

    await dispatch({
      type: GET_NEW_POST_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err.message);

    dispatch({ type: GET_NEW_POST_FAIL });
  }
};
