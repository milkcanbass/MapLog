import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOCATION,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: false,
  postStatus: false,
  lat: 43.653908,
  lng: -79.384293,
  createdAt: new Date().getTime()
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        postStatus: false,
        isAuth: true
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        token: payload.token, //Why is this effect???
        postStatus: false,
        isAuth: true
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        token: null,
        postStatus: false,
        isAuth: false
      };
    case USER_LOCATION:
      return {
        ...state,
        ...payload,
        lat: payload.coords.latitude,
        lng: payload.coords.longitude
      };
    default:
      return state;
  }
}
