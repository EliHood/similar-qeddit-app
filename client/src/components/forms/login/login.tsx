import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";

interface LoginInterface {
    submit: (event) => void;
    username: String;
    password: String;
    usernameChange: (event) => void;
    passwordChange: (event) => void;
}

const LoginForm = (props: LoginInterface) => (
    <form style={{ width: "100%" }} onSubmit={props.submit}>
        <TextField label="Username" style={{ width: "100%" }} name="username" value={props.username} onChange={props.usernameChange} margin="normal" />
        <br />
        <TextField label="Password" name="password" type="password" style={{ width: "100%" }} className="" value={props.password} onChange={props.passwordChange} margin="normal" />
        {/*  */}
        <br />
        <br />

        <Button variant="outlined" color="primary" type="submit">
            Login
        </Button>
    </form>
);

export default LoginForm;
