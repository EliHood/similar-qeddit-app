import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import Nav from "./Nav";
import * as serviceWorker from "./serviceWorker";
import { store, persitor } from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { userSession } from "./utils";
import App from "./App";
const app = (
    <Provider store={store}>
        <PersistGate persistor={persitor}>
            <App />
        </PersistGate>
    </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
