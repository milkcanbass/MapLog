import {
  GETALLPOST_SUCCESS,
  GETALLPOST_FAIL,
  GETIMG_SUCCESS,
  GETIMG_FAIL,
  CLEAR_ALL_POST,
  LOADING_POST_OFF,
  LOADING_IMG_ON,
  LOADING_IMG_OFF,
  OFF_BOND_OFFSET
} from "../actions/types";

const initialState = {
  allPost: [],
  loadAllPost: false,
  loadingPost: false,
  img: "",
  loadingImg: false,
  offBondOffset: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GETALLPOST_SUCCESS:
      return {
        ...state,
        allPost: payload,
        loadAllPost: true,
        loadingPost: true,
        offBondOffset: true
      };
    case GETALLPOST_FAIL:
    case CLEAR_ALL_POST:
      return {
        ...state,
        allPost: [],
        loadAllPost: false,
        loadingPost: false,
        loadingImg: false,
        offBondOffset: false
      };
    case GETIMG_SUCCESS:
      return {
        ...state,
        img: payload,
        loadingImg: true
      };
    case GETIMG_FAIL:
      return {
        ...state,
        img: "",
        loadingImg: false
      };

    case LOADING_POST_OFF:
      return {
        ...state,
        loadingPost: false
      };
    case LOADING_IMG_ON:
      return {
        ...state,
        loadingImg: true
      };
    case LOADING_IMG_OFF:
      return {
        ...state,
        img: "",
        loadingImg: false
      };

    case OFF_BOND_OFFSET:
      return {
        ...state,
        offBondOffset: false
      };
    default:
      return state;
  }
}
