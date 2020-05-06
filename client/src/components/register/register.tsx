import Typography from "@material-ui/core/Typography";
import React, { Component, Fragment } from "react";
import SignUpForm from "../forms/signUp/signUp";
import GridHoc from "../hoc/grid";
import IsAuth from "../hoc/isAuthenticated";
import CssBaseline from "@material-ui/core/CssBaseline";
import { InputHook } from "./../common/handleHook";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import GroupIcon from "@material-ui/icons/Group";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
export interface registerProps {
    onChange: (event: any) => void;
    signUpInit: (event: object, history: object) => void;
    addUsername: (event: object) => void;
    addEmail: (event: object) => void;
    addPassword: (event: object) => void;
    addPasswordConf: (event: object) => void;
    user?: any;
    history?: any;
}
export interface registerState {
    passwordConf: string;
    passErr: string;
}
const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        width: "100%",
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor: theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
function Register(registerProps: any) {
    const classes = useStyles();
    const { handleInputChange } = InputHook(registerProps);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { username, email, password, passwordConf } = registerProps.user;
        const creds = {
            username,
            email,
            password,
        };
        console.log(creds);
        registerProps.signUpInit(creds, registerProps.history);
    };
    const { username, email, password, passwordConf, passwordConfError, usernameError, passwordError, emailError } = registerProps.user;

    const isEnabled = passwordConfError === true && emailError === true && passwordError === true && usernameError === true ? false : true;
    return (
        <Fragment>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <GroupIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        {registerProps.user.error && <div>{registerProps.user.error}</div>}
                        <SignUpForm
                            submit={handleSubmit}
                            usernameChange={handleInputChange}
                            emailChange={handleInputChange}
                            passwordChange={handleInputChange}
                            passwordConfChange={handleInputChange}
                            username={username}
                            password={password}
                            passwordConf={passwordConf}
                            email={email}
                            usernameError={usernameError}
                            passwordError={passwordError}
                            passwordConfError={passwordConfError}
                            emailError={emailError}
                            disButton={isEnabled}
                        />
                    </div>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default IsAuth(Register);
