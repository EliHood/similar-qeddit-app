import React from 'react'
import ReactDOM from 'react-dom/client'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'
import './index.css'
import { PersistGate } from 'redux-persist/lib/integration/react'
import createStore from '@mfe/redux-store/src/store'
import App from './App'

export const store = createStore()

export const persitor = persistStore(store)

const NewApp = (
    <Provider store={store}>
        <PersistGate persistor={persitor}>
            <App />
        </PersistGate>
    </Provider>
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(NewApp)

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
