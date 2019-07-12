import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOCATION
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  latitude: 43.653908,
  longitude: -79.384293,
  createdAt: new Date().getTime()
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuth: true
      };
    case REGISTER_FAIL:
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
