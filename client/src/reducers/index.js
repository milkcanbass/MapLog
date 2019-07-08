import { combineReducers } from "redux";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";

export default combineReducers({
  userReducer,
  commentReducer
});
