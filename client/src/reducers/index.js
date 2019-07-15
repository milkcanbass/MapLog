import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  userReducer,
  postReducer,
  modalReducer
});
