import Typography from "@material-ui/core/Typography";
import React, { Component, Fragment } from "react";
import SignUpForm from "../forms/signUp/signUp";
import GridHoc from "../hoc/grid";
import IsAuth from "../hoc/isAuthenticated";
import { InputHook } from "./../common/handleHook";
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
function Register(registerProps: any) {
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
            <Typography variant="h4" style={{ letterSpacing: "2px" }}>
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
        </Fragment>
    );
}

export default GridHoc(IsAuth(Register));
