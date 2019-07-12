import { combineReducers } from "redux";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  userReducer,
  commentReducer,
  modalReducer
});
