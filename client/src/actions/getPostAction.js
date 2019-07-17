import { GETALLPOST_SUCCESS, GETALLPOST_FAIL } from "./types";
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
    await dispatch({ type: GETALLPOST_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err.message);
    await dispatch({ type: GETALLPOST_FAIL });
  }
};
