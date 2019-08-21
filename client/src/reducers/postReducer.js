import {
  NEW_MARKER_SUCCESS,
  RESET_NEW_MARKER,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL
} from "../actions/types";

const initialState = {
  id: null,
  title: "",
  text: "",
  position: {
    markerLat: "",
    markerLng: ""
  },
  myImg: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_MARKER_SUCCESS:
      return {
        ...state,
        position: {
          markerLat: payload.lat,
          markerLng: payload.lng
        }
      };
    case RESET_NEW_MARKER: {
      return state;
    }
    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        deleted: true
      };
    }
    case DELETE_POST_FAIL: {
      return {
        ...state,
        deleted: null
      };
    }
    default:
      return state;
  }
}
