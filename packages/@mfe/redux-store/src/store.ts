// NEW CODE: You can also remove the redux-thunk dependency
import sagas from './sagas';
import {rootReducer}  from './reducers';
export { sagas }

// const sagaMiddleware = createSagaMiddleware();
// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
// export const persitor = persistStore(store);
export { userActions, postActions } from './actions'
export * as selectors from './selectors'
// sagas.map(sagaMiddleware.run)