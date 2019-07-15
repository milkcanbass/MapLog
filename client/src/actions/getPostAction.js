import { GETALLPOST_SUCCESS, GETALLPOST_FAIL } from "./types";
import axios from "axios";

export const getAllPost = () => async dispatch => {
  try {
    const res = await axios.get("api/post/files");
    dispatch({ type: GETALLPOST_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: GETALLPOST_FAIL });
  }
};
