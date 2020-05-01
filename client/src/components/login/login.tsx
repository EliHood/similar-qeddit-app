import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import React, { Component, Fragment } from "react";
import LoginForm from "../forms/login/login";
import GridHoc from "../hoc/grid";
import IsAuth from "../hoc/isAuthenticated";
export interface loginProps {
    onChange: (event: any) => void;
    loginInit: (event: object, history: object) => void;
    initLogin: () => void;
    user?: any;
    history?: any;
}
export interface loginState {
    username: string;
    password: string;
}

class Login extends Component<loginProps, loginState> {
    state: loginState = {
        username: "",
        password: "",
    };
    handleChange = (e: any) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        } as any);
    };
    goBackEmailConfirmation = () => {
        this.props.history.goBack();
    };
    handleSubmit = (e: any) => {
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

        this.props.loginInit(creds, this.props.history);
    };
    render() {
        console.log(this.props.user.error);
        return (
            <Fragment>
                {this.props.user.error && (
                    <div>
                        <Alert severity="warning">{this.props.user.error}</Alert>
                    </div>
                )}
                {this.props.user.error.includes("Please activate") && (
                    <div style={{ padding: "20px 0px" }}>
                        <Typography variant="h6" style={{ cursor: "pointer" }} onClick={() => this.goBackEmailConfirmation()}>
                            {" "}
                            Back{" "}
                        </Typography>
                    </div>
                )}
                <Typography variant="h4" style={{ letterSpacing: "2px" }}>
                    Login
                </Typography>
                <LoginForm submit={this.handleSubmit} username={this.state.username} password={this.state.password} loginOnChange={this.handleChange} />
                {/* <h2>Login With Google</h2>
                <a href={process.env.REACT_APP_BASE_URL + "api/v1/users/auth/google"}>Login With Google</a> */}
            </Fragment>
        );
    }
}

export default GridHoc(IsAuth(Login));
