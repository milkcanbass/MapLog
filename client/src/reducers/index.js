import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import modalReducer from "./modalReducer";
import getPostReducer from "./getPostReducer";
import windowReducer from "./windowReducer";

export default combineReducers({
  userReducer,
  postReducer,
  modalReducer,
  getPostReducer,
  windowReducer
});
