import authReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: authReducer
});

export default rootReducer;
