import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, logOutInit } from "./actions/userActions";
import { history } from "./ourHistory";
import Router from "./Router";
export interface routerContainerState {
  hasError: boolean;
}
export interface routerContainerProps {
  getUser: () => void;
  logOutInit: (data) => void;
  user: {
    isAuthenticated: boolean;
  };
}
class Nav extends Component<routerContainerProps, routerContainerState> {
  public state: routerContainerState = {
    hasError: false,
  };
  componentDidMount() {
    this.props.getUser();
  }
  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      hasError: true,
    });
  }

  ourLogOut = (e) => {
    e.preventDefault();
    this.props.logOutInit(history);

  }

  render() {
    const { hasError } = this.state;
    return (
      <Router
        hasError={hasError}
        logOut={this.ourLogOut}
        user={this.props.user.isAuthenticated}
        {...this.props.user}
      />
    );
  }
}
const dispatchToProps = (dispatch: any) => ({
  getUser: () => dispatch(getUser()),
  logOutInit: (data: object) => dispatch(logOutInit(data)),
});

const mapStateToProps = (state: any) => ({
  user: state.user,
});
export default connect(mapStateToProps, dispatchToProps)(Nav);
