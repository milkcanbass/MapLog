import {
  NEW_MARKER_SUCCESS,
  RESET_NEW_MARKER,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  MODAL_ALERT
} from "./types";
import axios from "axios";
import store from "../store";
import { getAllPost } from "../actions/getPostAction";
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

    store.dispatch(getAllPost());
  } catch (err) {
    console.log(err);
    const errorMessage =
      "ServerError(500) \n The file isn't under 1MB or jpeg/png file.";
    dispatch({ type: MODAL_ALERT, payload: errorMessage });
  }
};

export const addNewMarker = payload => dispatch => {
  const lat = payload.latLng.lat();
  const lng = payload.latLng.lng();

  dispatch({
    type: NEW_MARKER_SUCCESS,
    payload: { lat, lng }
  });

  //To Close other marker's infoWindow opened.
  store.dispatch(postWindowClose());
};

export const resetNewMarker = () => dispatch => {
  //reset newMaker. using for logout
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
