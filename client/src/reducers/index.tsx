import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./userReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["notDark"],
};
const pesistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
    user: pesistedReducer,
    post: postReducer,
});

export default rootReducer;
