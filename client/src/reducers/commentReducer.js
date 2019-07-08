import { COMMENT_SUCCESS, COMMENT_FAIL } from "../actions/types";

const initialState = {
  name: null,
  latitude: 43.653908,
  longitude: -79.384293,
  comment: null,
  createdAt: new Date().getTime(),
  commented: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COMMENT_SUCCESS:
      return {
        ...state,
        ...payload,
        commented: true
      };
    case COMMENT_FAIL:
      return {
        ...state,
        ...payload,
        commented: null
      };
    default:
      return state;
  }
}
