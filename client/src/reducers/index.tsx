import { combineReducers } from "redux";
import authReducer from "./userReducer";

const rootReducer = combineReducers({
  user: authReducer,
});

export default rootReducer;
