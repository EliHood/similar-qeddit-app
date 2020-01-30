import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import React from "react";
const SignUpForm = (props: any) => (
    <form onSubmit={props.submit}>
        <TextField
            label="Username"
            style={{ width: "100%" }}
            name="username"
            value={props.username}
            error={props.usernameError === true || props.usernameError === "" ? false : true}
            onChange={props.usernameChange}
            margin="normal"
        />
        <FormHelperText error={true} id="component-helper-text">
            {props.usernameError}
        </FormHelperText>

        <TextField
            label="Email"
            className=""
            style={{ width: "100%" }}
            name="email"
            error={props.emailError === true || props.emailError === "" ? false : true}
            value={props.email}
            onChange={props.emailChange}
            margin="dense"
        />
        <FormHelperText error={true} id="component-helper-text">
            {props.emailError}
        </FormHelperText>
        <TextField
            label="Password"
            name="password"
            type="password"
            style={{ width: "100%" }}
            className=""
            error={props.passwordError === true || props.passwordError === "" ? false : true}
            value={props.password}
            onChange={props.passwordChange}
            margin="dense"
        />
        <FormHelperText error={true} id="component-helper-text">
            {props.passwordError}
        </FormHelperText>
        <br />
        <br />
        <Button disabled={props.disButton} variant="outlined" color="primary" type="submit">
            Sign Up
        </Button>
    </form>
);

export default SignUpForm;
