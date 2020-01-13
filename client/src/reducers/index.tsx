import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./userReducer";
const rootReducer = combineReducers({
  user: authReducer,
  post: postReducer,
});

export default rootReducer;
