import { COMMENT_SUCCESS, COMMENT_FAIL } from "./types";

export const comment = payload => async dispatch => {
  try {
    console.log("comment success");
    dispatch({ type: COMMENT_SUCCESS, payload: payload });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: COMMENT_FAIL });
  }
};
