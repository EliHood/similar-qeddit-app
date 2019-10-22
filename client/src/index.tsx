import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { store } from "./store";
import MyRouter from "./Router";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#C3DFE0"
    },
    secondary: {
      main: "#000000"
    }
  }
});
console.log(store);

const app = (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <MyRouter />
    </Provider>
  </MuiThemeProvider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
