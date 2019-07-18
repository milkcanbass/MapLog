import {
  POST_SUCCESS,
  POST_FAIL,
  NEW_MARKER_SUCCESS,
  RESET_NEW_MARKER
} from "./types";
import axios from "axios";
import store from "../store";

export const post = payload => async dispatch => {
  try {
    //Need an image to upload comments.
    const { title, text, myImg, lat, lng } = payload;
    console.log(title);
    console.log(text);

    const state = store.getState();
    const id = state.userReducer.id;

    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    const formData = new FormData();
    await formData.append("myImg", myImg);
    await formData.append("title", title);
    await formData.append("text", text);
    await formData.append("lat", lat);
    await formData.append("lng", lng);
    await formData.append("id", id);

    await axios.post("/api/post/uploadImg", formData, config);
    console.log(formData);
    dispatch({ type: POST_SUCCESS, payload: payload });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: POST_FAIL });
  }
};

export const addNewMarker = payload => dispatch => {
  const lat = payload.latLng.lat();
  const lng = payload.latLng.lng();

  dispatch({
    type: NEW_MARKER_SUCCESS,
    payload: { lat, lng }
  });
};

export const resetNewMarker = () => dispatch => {
  dispatch({ type: RESET_NEW_MARKER });
};
