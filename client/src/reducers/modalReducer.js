import { MODAL_SHOW, MODAL_CLOSE } from "../actions/types";

const initialState = {
  modalOpen: false
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
    default:
      return state;
  }
}
