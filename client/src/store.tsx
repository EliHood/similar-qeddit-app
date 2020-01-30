import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
// NEW CODE: You can also remove the redux-thunk dependency
import sagas from "./sagas";
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagas.map(sagaMiddleware.run);
