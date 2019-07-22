import {
  WINDOW_OPEN,
  WINDOW_CLOSE,
  POST_WINDOW_OPEN,
  POST_WINDOW_CLOSE,
  SET_SELECTED_POST,
  OFF_SELECTED_POST
} from "../actions/types";

const initialState = {
  postOpenInfo: false,
  openInfo: false,
  selectedPost: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case WINDOW_OPEN:
      return {
        ...state,
        openInfo: true,
        postOpenInfo: false
      };
    case WINDOW_CLOSE:
    case POST_WINDOW_CLOSE:
      return {
        ...state,
        openInfo: false,
        postOpenInfo: false
      };
    case POST_WINDOW_OPEN:
      return {
        ...state,
        openInfo: false,
        postOpenInfo: true
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
