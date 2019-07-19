import {
  MODAL_SHOW,
  MODAL_CLOSE,
  POST_MODAL_SHOW,
  POST_MODAL_CLOSE,
  INFO_MODAL_SHOW,
  INFO_MODAL_CLOSE,
  SIGNIN_ON,
  SIGNIN_OFF
} from "../actions/types";

const initialState = {
  modalOpen: false,
  postModalOpen: false,
  infoModalOpen: false,
  signInOn: false //True = SignIn screen open
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MODAL_SHOW:
      return {
        ...state,
        modalOpen: true
      };
    case MODAL_CLOSE:
    case POST_MODAL_CLOSE:
    case INFO_MODAL_CLOSE:
      return {
        ...state,
        modalOpen: false,
        postModalOpen: false,
        infoModalOpen: false
      };
    case POST_MODAL_SHOW:
      return {
        ...state,
        postModalOpen: true
      };

    case INFO_MODAL_SHOW:
      return {
        ...state,
        infoModalOpen: true
      };

    case SIGNIN_ON:
      return {
        ...state,
        signInOn: true
      };
    case SIGNIN_OFF:
      return {
        ...state,
        signInOn: false
      };
    default:
      return state;
  }
}
