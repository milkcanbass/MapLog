import { GETALLPOST_SUCCESS, GETALLPOST_FAIL } from "../actions/types";

const initialState = {
  allPost: [],
  loadAllPost: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GETALLPOST_SUCCESS:
      return {
        ...state,
        ...payload,
        allPost: payload,
        loadAllPost: true
      };
    case GETALLPOST_FAIL:
      return {
        ...state,
        ...payload,
        allPost: [],
        loadAllPost: false
      };
    default:
      return state;
  }
}
