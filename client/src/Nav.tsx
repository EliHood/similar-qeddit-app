import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "./Router";
import { getUser, logOutInit } from "./actions/userActions";
import { withRouter } from "react-router";
export interface routerContainerState {
  hasError: boolean;
}
export interface routerContainerProps {
  getUser: () => void;
  logOutInit: () => void;
  user: {
    isAuthenticated: boolean;
  };
}
class Nav extends Component<routerContainerProps, routerContainerState> {
  state: routerContainerState = {
    hasError: false
  };
  componentDidMount() {
    this.props.getUser();
  }
  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      hasError: true
    });
  }

  render() {
    const { hasError } = this.state;
    console.log(this.props.user.isAuthenticated);
    return (
      <Router
        hasError={hasError}
        logOut={this.props.logOutInit}
        user={this.props.user.isAuthenticated}
      />
    );
  }
}
const dispatchToProps = (dispatch: any) => ({
  getUser: () => dispatch(getUser()),
  logOutInit: () => dispatch(logOutInit())
});

const mapStateToProps = (state: any) => ({
  user: state.user
});
export default connect(mapStateToProps, dispatchToProps)(Nav);
