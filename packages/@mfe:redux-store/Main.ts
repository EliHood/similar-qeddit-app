import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
// NEW CODE: You can also remove the redux-thunk dependency
import { sagas, rootReducer } from './src';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
export const persitor = persistStore(store);
export { userActions, postActions } from './src/actions'
export * as selectors from './src/selectors'
sagas.map(sagaMiddleware.run);
