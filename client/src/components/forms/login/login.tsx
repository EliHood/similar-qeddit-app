import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const LoginForm = (props: any) => (
  <form onSubmit={props.submit}>
    <TextField
      label="Username"
      style={{ width: "100%" }}
      name="username"
      value={props.username}
      onChange={props.loginOnChange}
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
      onChange={props.loginOnChange}
      margin="normal"
    />
    {/*  */}
    <br />
    <br />

    <Button variant="outlined" color="primary" type="submit">
      Login
    </Button>
  </form>
);

export default LoginForm;
