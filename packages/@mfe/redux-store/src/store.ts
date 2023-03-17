import { createStore as createReduxStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import rootReducer from './reducers'

const createStore = (initalState = {}) => {
    const sagaMiddleware = createSagaMiddleware()
    const store: any = createReduxStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    )
    // store.runSaga = sagaMiddleware.run;
    // store.injectedReducers = {}; // Reducer registry
    // store.injectedSagas = {}; // Saga registry
    sagas.map(sagaMiddleware.run)
    return store
}

export { userActions, postActions } from './actions'
export { selectors } from './selectors'
export default createStore
