import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOCATION,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  MODAL_REGISTER_FAIL,
  MODAL_CLOSE,
  MODAL_LOGIN_FAIL
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import store from "../store";
import { modalClose } from "./modalActions";
import { resetNewMarker } from "./postAction";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth/");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.log(err.message);

    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  console.log({ name, email, password });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("api/auth/register", body, config);
    console.log(res.data);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
    store.dispatch(modalClose());
  } catch (err) {
    const errors = err.response.data;

    dispatch({ type: REGISTER_FAIL });
    dispatch({ type: MODAL_CLOSE });
    dispatch({ type: MODAL_REGISTER_FAIL, payload: errors });
  }
};

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("api/auth/login", body, config);
    console.log(res);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
    store.dispatch(modalClose());
  } catch (err) {
    const errors = err.response.data;

    dispatch({ type: LOGIN_FAIL });
    dispatch({ type: MODAL_CLOSE });
    dispatch({ type: MODAL_LOGIN_FAIL, payload: errors });
  }
};

export const logout = () => dispatch => {
  console.log("logout");

  dispatch({
    type: LOGOUT
  });
  store.dispatch(resetNewMarker());
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
