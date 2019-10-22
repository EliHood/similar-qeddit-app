import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import SignUpForm from "../forms/signUp/signUp";
import GridHoc from "../hoc/grid";

export interface registerProps {
  onChange: (event: any) => void;
  signUpInit: (event: object) => void;
}
export interface registerState {
  username: string;
  password: string;
  email: string;
  passwordConf: string;
  passErr: string;
}
class Register extends Component<registerProps, registerState> {
  state: registerState = {
    username: "",
    password: "",
    email: "",
    passwordConf: "",
    passErr: ""
  };

  handleChange = (e: any) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    } as any);
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { username, email, password, passwordConf } = this.state;
    this.setState({
      username: this.state.username,
      password: this.state.password,
      passwordConf: this.state.passwordConf,
      email: this.state.email
    });
    const creds = {
      username,
      email,
      password
    };
    console.log(creds);

    if (password === passwordConf) {
      this.props.signUpInit(creds);
    } else {
      this.setState({ passErr: "Passwords Don't Match" });
    }
  };
  render() {
    return (
      <Fragment>
        <Typography variant="h4" style={{ letterSpacing: "2px" }}>
          Register
        </Typography>
        <SignUpForm
          submit={this.handleSubmit}
          username={this.state.username}
          password={this.state.password}
          email={this.state.email}
          passwordConf={this.state.passwordConf}
          signUpOnChange={this.handleChange}
        />
      </Fragment>
    );
  }
}
export default GridHoc(Register);
