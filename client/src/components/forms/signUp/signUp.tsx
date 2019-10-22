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
      onChange={props.signUpOnChange}
      margin="normal"
    />
    <br />
    <TextField
      label="Email"
      className=""
      style={{ width: "100%" }}
      name="email"
      value={props.email}
      onChange={props.signUpOnChange}
      margin="normal"
    />
    <br />
    <TextField
      label="Password"
      name="password"
      type="password"
      style={{ width: "100%" }}
      className=""
      value={props.password}
      onChange={props.signUpOnChange}
      margin="normal"
    />
    {/*  */}
    <br />
    <TextField
      label="Confirm Password"
      name="passwordConf"
      type="password"
      style={{ width: "100%" }}
      className=""
      value={props.passwordConf}
      onChange={props.signUpOnChange}
      margin="normal"
    />
    <br />
    <br />

    <Button variant="outlined" color="primary" type="submit">
      Sign Up
    </Button>
  </form>
);

export default SignUpForm;
