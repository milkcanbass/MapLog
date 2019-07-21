import {
  GETALLPOST_SUCCESS,
  GETALLPOST_FAIL,
  GETIMG_SUCCESS,
  GETIMG_FAIL,
  CLEAR_ALL_POST,
  BINDSFLAG_ON,
  BINDSFLAG_OFF
} from "../actions/types";

const initialState = {
  allPost: [],
  loadAllPost: false,
  img: "",
  loadImg: false,
  boundFlag: null
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
    case CLEAR_ALL_POST:
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
    case BINDSFLAG_ON:
      return {
        ...state,
        boundFlag: true
      };
    case BINDSFLAG_OFF:
      return {
        ...state,
        boundFlag: false
      };
    default:
      return state;
  }
}
