import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const SignUpForm = (props: any) => (
  <form onSubmit={props.submit}>
    <TextField
      label="Username"
      style={{ width: "100%" }}
      name="username"
      value={props.username}
      error={props.usernameError === true || props.usernameError === "" ? false : true}
      helperText={props.usernameError}
      onChange={props.usernameChange}
      margin="normal"
    />
    <br />
    <TextField
      label="Email"
      className=""
      style={{ width: "100%" }}
      name="email"
      error={props.emailError === true || props.emailError === "" ? false : true}
      helperText={props.emailError}
      value={props.email}
      onChange={props.emailChange}
      margin="normal"
    />
    <br />
    <TextField
      label="Password"
      name="password"
      type="password"
      style={{ width: "100%" }}
      className=""
      error={props.passwordError === true || props.passwordError === "" ? false : true}
      helperText={props.passwordError}
      value={props.password}
      onChange={props.passwordChange}
      margin="normal"
    />
    {/*  */}
    <br />

    <br />
    <br />

    <Button disabled={props.disButton} variant="outlined" color="primary" type="submit">
      Sign Up
    </Button>
  </form>
);

export default SignUpForm;
