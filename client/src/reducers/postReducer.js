import { POST_SUCCESS, POST_FAIL } from "../actions/types";

const initialState = {
  name: null,
  myImg: null,
  lat: 43.653908,
  lng: -79.384293,
  comment: null,
  createdAt: new Date().getTime(),
  commented: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_SUCCESS:
      return {
        ...state,
        ...payload,
        commented: true
      };
    case POST_FAIL:
      return {
        ...state,
        ...payload,
        commented: null
      };
    default:
      return state;
  }
}
