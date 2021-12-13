import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import './index.css'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { rootReducer } from '@mfe/redux-store/src/reducers'
import { sagas } from '@mfe/redux-store/src'
import App from './App'

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)
export const persitor = persistStore(store)
sagas.map(sagaMiddleware.run)

const app = (
    <Provider store={store}>
        <PersistGate persistor={persitor}>
            <App />
        </PersistGate>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'))

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
