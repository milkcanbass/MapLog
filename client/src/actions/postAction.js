import {
  POST_SUCCESS,
  POST_FAIL,
  NEW_MARKER_SUCCESS,
  RESET_NEW_MARKER,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL
} from "./types";
import axios from "axios";
import store from "../store";
import { bindsFlagOff, getAllPost, getNewPost } from "../actions/getPostAction";
import { postWindowClose } from "./windowAction";

export const post = payload => async dispatch => {
  try {
    //Need an image to upload comments.

    const { title, text, myImg } = payload;

    const state = store.getState();
    const markerLat = state.postReducer.position.markerLat;
    const markerLng = state.postReducer.position.markerLng;
    const id = state.userReducer.id;

    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    const formData = new FormData();
    await formData.append("myImg", myImg);
    await formData.append("title", title);
    await formData.append("text", text);
    await formData.append("position[lat]", markerLat.toString());
    await formData.append("position[lng]", markerLng.toString());
    await formData.append("id", id);

    await axios.post("/api/post/uploadImg", formData, config);

    store.dispatch(getNewPost());

    await dispatch({ type: POST_SUCCESS, payload: payload });

    store.dispatch(getAllPost());
  } catch (err) {
    console.log(err.message);
    dispatch({ type: POST_FAIL });
  }
};

export const addNewMarker = payload => dispatch => {
  const lat = payload.latLng.lat();
  const lng = payload.latLng.lng();
  console.log(lat, lng);

  store.dispatch(bindsFlagOff());

  dispatch({
    type: NEW_MARKER_SUCCESS,
    payload: { lat, lng }
  });
  store.dispatch(postWindowClose());
};

export const resetNewMarker = () => dispatch => {
  dispatch({ type: RESET_NEW_MARKER });
};

export const deletePost = filename => async dispatch => {
  try {
    await axios.delete("/api/post/files/delete", {
      params: { filename: filename }
    });

    await dispatch({ type: DELETE_POST_SUCCESS });

    await store.dispatch(getAllPost());
  } catch (err) {
    console.log(err.message);
    dispatch({ type: DELETE_POST_FAIL });
  }
};
