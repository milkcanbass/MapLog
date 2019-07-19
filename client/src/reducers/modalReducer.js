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
  postModalOpen: false,
  infoModalOpen: false,
  signInOn: false, //True = SignIn screen open
  infoModalType: null,
  infoModalText: ""
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
    case MODAL_REGISTER_FAIL:
      return {
        ...state,
        infoModalOpen: true,
        infoModalType: "registerFail",
        infoModalText: payload
      };
    case MODAL_LOGIN_FAIL:
      return {
        ...state,
        infoModalOpen: true,
        infoModalType: "loginFail",
        infoModalText: payload
      };
    case MODAL_ALERT:
      return {
        ...state,
        infoModalOpen: true,
        infoModalType: "alert",
        infoModalText: payload
      };
    default:
      return state;
  }
}
