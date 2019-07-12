import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOCATION } from "./types";
import axios from "axios";

export const register = ({ name, email, password }) => async dispatch => {
  console.log({ name, email, password });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/auth/register", body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    // dispatch(loadUser());
  } catch (err) {
    console.log(err.message);

    dispatch({ type: REGISTER_FAIL });
  }
};

export const moveToCurrentLoc = payload => dispatch => {
  try {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(position => {
      dispatch({ type: USER_LOCATION, payload: position });
    });
  } catch (err) {
    alert(err);
    console.log(err.message);
  }
};
