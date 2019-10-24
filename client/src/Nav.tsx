import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "./Router";
import { fetchAutoAuthInit, logOutInit } from "./actions/userActions";
export interface routerContainerState {
  hasError: boolean;
}
export interface routerContainerProps {
  fetchAutoAuthInit: () => void;
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
    // this.props.fetchAutoAuthInit();
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
  fetchAutoAuthInit: () => dispatch(fetchAutoAuthInit()),
  logOutInit: () => dispatch(logOutInit())
});

const mapStateToProps = (state: any) => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  dispatchToProps
)(Nav);
