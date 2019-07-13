import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOCATION,
  AUTH_ERROR,
  USER_LOADED
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
        isAuth: true
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        ...payload,
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
