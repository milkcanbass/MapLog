import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOCATION,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: false,
  latitude: 43.653908,
  longitude: -79.384293,
  createdAt: new Date().getTime()
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        token: payload.token,
        isAuth: true
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      console.log(payload);

      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        token: payload.token,
        isAuth: true
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        token: null,
        isAuth: false
      };
    case USER_LOCATION: {
      return {
        ...state,
        ...payload,
        latitude: payload.coords.latitude,
        longitude: payload.coords.longitude
      };
    }
    default:
      return state;
  }
}
