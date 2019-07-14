import {
  MODAL_SHOW,
  MODAL_CLOSE,
  POST_MODAL_SHOW,
  POST_MODAL_CLOSE,
  POST_ABLE,
  POST_DISABLE,
  SIGNIN_ON,
  SIGNIN_OFF
} from "../actions/types";

const initialState = {
  modalOpen: false,
  postModalOpen: false,
  signInOn: false //True = SignIn screen open
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MODAL_SHOW:
      return {
        ...state,
        ...payload,
        modalOpen: true
      };
    case MODAL_CLOSE:
      return {
        ...state,
        ...payload,
        modalOpen: false,
        postModalOpen: false
      };
    case POST_MODAL_SHOW:
      return {
        ...state,
        ...payload,
        postModalOpen: true
      };
    case POST_MODAL_CLOSE:
      return {
        ...state,
        ...payload,
        postModalOpen: false
      };
    case POST_ABLE:
      return {
        ...state,
        ...payload,
        postStatus: true
      };
    case POST_DISABLE:
      return {
        ...state,
        ...payload,
        postStatus: false
      };
    case SIGNIN_ON:
      return {
        ...state,
        ...payload,
        signInOn: true
      };
    case SIGNIN_OFF:
      return {
        ...state,
        ...payload,
        signInOn: false
      };
    default:
      return state;
  }
}
