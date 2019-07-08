import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

export const register = payload => dispatch => {
  try {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(position => {
      dispatch({ type: REGISTER_SUCCESS, payload: position });
    });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });
  }
};
