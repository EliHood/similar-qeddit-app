import Typography from "@material-ui/core/Typography";
import React, { Component, Fragment } from "react";
import { GoogleLogin } from "react-google-login";
import LoginForm from "../forms/login/login";
import GridHoc from "../hoc/grid";
import IsAuth from "../hoc/isAuthenticated";

export interface loginProps {
  onChange: (event: any) => void;
  loginInit: (event: object) => void;
  initLogin: () => void;
  user?: any;
}
export interface loginState {
  username: string;
  password: string;
}

class Login extends Component<loginProps, loginState> {
  public state: loginState = {
    username: "",
    password: "",
  };
  public handleChange = (e: any) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    } as any);
  }

  public handleSubmit = (e: any) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.setState({
      username: this.state.username,
      password: this.state.password,
    });
    const creds = {
      username,
      password,
    };
    console.log(creds);

    this.props.loginInit(creds);
  }
  public render() {
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
        <h2>Login With Google</h2>
        <a href={process.env.REACT_APP_BASE_URL + "api/v1/users/auth/google"}>
          Login With Google
        </a>
      </Fragment>
    );
  }
}

export default GridHoc(IsAuth(Login));
