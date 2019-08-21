import {
  MODAL_SHOW,
  MODAL_CLOSE,
  POST_MODAL_SHOW,
  INFO_MODAL_SHOW,
  SIGNIN_ON,
  SIGNIN_OFF,
  MODAL_REGISTER_FAIL,
  MODAL_LOGIN_FAIL,
  MODAL_ALERT
} from "../actions/types";

const initialState = {
  modalOpen: false,
  postmodalopen: false,
  infoModalOpen: false,
  signInOn: false, //True = SignIn screen open
  infomodaltype: null,
  infomodaltext: "",
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
      return {
        ...state,
        modalOpen: false,
        postmodalopen: false,
        infoModalOpen: false
      };
    case POST_MODAL_SHOW:
      return {
        ...state,
        postmodalopen: true
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
    case MODAL_REGISTER_FAIL:
      return {
        ...state,
        infoModalOpen: true,
        infomodaltype: "registerFail",
        infomodaltext: payload
      };
    case MODAL_LOGIN_FAIL:
      return {
        ...state,
        infoModalOpen: true,
        infomodaltype: "loginFail",
        infomodaltext: payload
      };
    case MODAL_ALERT:
      return {
        ...state,
        infoModalOpen: true,
        infomodaltype: "alert",
        infomodaltext: payload
      };
    default:
      return state;
  }
}
