import {
  GETALLPOST_SUCCESS,
  GETALLPOST_FAIL,
  GETIMG_SUCCESS,
  GETIMG_FAIL
} from "../actions/types";

const initialState = {
  allPost: [],
  loadAllPost: false,
  img: "",
  loadImg: false
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
    case GETIMG_SUCCESS:
      console.log(payload);
      return {
        ...state,
        img: payload,
        loadImg: true
      };
    case GETIMG_FAIL:
      return {
        ...state,
        img: "",
        loadImg: false
      };
    default:
      return state;
  }
}
