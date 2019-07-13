import {
  MODAL_SHOW,
  MODAL_CLOSE,
  SIGNIN_ON,
  SIGNIN_OFF
} from "../actions/types";

const initialState = {
  modalOpen: false,
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
        modalOpen: false
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
