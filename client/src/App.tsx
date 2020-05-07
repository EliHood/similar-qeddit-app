import React, { useState } from "react";
import { createMuiTheme, ThemeProvider, MuiThemeProvider } from "@material-ui/core/styles";
import { setDark } from "./actions/userActions";
import { store } from "./store";
import Nav from "./Nav";
import { Provider } from "react-redux";
import { userSession } from "./utils";
import { connect } from "react-redux";
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

const defaultTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#48A9A6",
        },
        secondary: {
            main: "#000000",
        },
    },
});

const dark = createMuiTheme({
    palette: {
        primary: {
            main: "#000",
        },
        secondary: {
            main: "#000",
        },
    },
});

function App(props: any) {
    const darkTheme = () => {
        props.setDark();
        console.log("testing");
    };
    console.log("checking for dark", props);
    return (
        <ThemeProvider theme={props.user.notDark ? defaultTheme : dark}>
            <Nav darkTheme={darkTheme} />
        </ThemeProvider>
    );
}

const mapStateToProps = (state: any) => ({
    user: state.user,
});
const mapDispatchToProps = (dispatch: any) => ({
    setDark: () => dispatch(setDark()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
