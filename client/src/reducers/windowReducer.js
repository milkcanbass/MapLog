import {
  WINDOW_OPEN,
  WINDOW_CLOSE,
  SET_SELECTED_POST,
  OFF_SELECTED_POST
} from "../actions/types";

const initialState = {
  openInfo: false,
  selectedPost: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case WINDOW_OPEN:
      return {
        ...state,
        openInfo: true
      };
    case WINDOW_CLOSE:
      return {
        ...state,
        openInfo: false
      };
    case SET_SELECTED_POST:
      return {
        ...state,
        selectedPost: payload
      };
    case OFF_SELECTED_POST:
      return {
        ...state,
        selectedPost: null
      };
    default:
      return state;
  }
}
