import { COMMENT_SUCCESS, COMMENT_FAIL } from "./types";
import axios from "axios";

export const comment = payload => async dispatch => {
  try {
    console.log("comment successed");
    dispatch({ type: COMMENT_SUCCESS, paylod: payload });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: COMMENT_FAIL });
  }
};
