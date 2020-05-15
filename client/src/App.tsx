import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { setDark } from "./actions/userActions";
import Nav from "./Nav";
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
defaultTheme.typography.h6 = {
    fontSize: "0.9rem",
    "@media (min-width:600px)": {
        fontSize: "0.5rem",
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: "1.4rem",
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: "1.4rem",
    },
};
defaultTheme.typography.h5 = {
    "@media (min-width:600px)": {
        fontSize: "0.9rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "1.4rem",
    },
};

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
    };

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
