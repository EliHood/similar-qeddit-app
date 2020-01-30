import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import Nav from "./Nav";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";
import { userSession } from "./utils";
userSession.userSession();
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#48A9A6",
        },
        secondary: {
            main: "#000000",
        },
    },
});

const app = (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Nav />
        </Provider>
    </MuiThemeProvider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
