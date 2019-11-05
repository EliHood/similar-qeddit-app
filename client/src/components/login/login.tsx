import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import LoginForm from "../forms/login/login";
import GridHoc from "../hoc/grid";
import IsAuth from "../hoc/isAuthenticated";

export interface loginProps {
  onChange: (event: any) => void;
  loginInit: (event: object) => void;
  user?: any;
}
export interface loginState {
  username: string;
  password: string;
}

class Login extends Component<loginProps, loginState> {
  state: loginState = {
    username: "",
    password: ""
  };

  handleChange = (e: any) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    } as any);
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.setState({
      username: this.state.username,
      password: this.state.password
    });
    const creds = {
      username,
      password
    };
    console.log(creds);

    this.props.loginInit(creds);
  };
  render() {
    return (
      <Fragment>
        {this.props.user.error && <div>{this.props.user.error}</div>}
        <Typography variant="h4" style={{ letterSpacing: "2px" }}>
          Login
        </Typography>
        <LoginForm
          submit={this.handleSubmit}
          username={this.state.username}
          password={this.state.password}
          loginOnChange={this.handleChange}
        />
      </Fragment>
    );
  }
}

export default GridHoc(IsAuth(Login));
