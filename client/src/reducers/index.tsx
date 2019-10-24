import { combineReducers } from "redux";
import authReducer from "./userReducer";
import postReducer from "./postReducer";
const rootReducer = combineReducers({
  user: authReducer,
  post: postReducer
});

export default rootReducer;
