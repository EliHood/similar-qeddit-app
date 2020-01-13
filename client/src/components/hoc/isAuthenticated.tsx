import React, { Component } from "react";
import { connect } from "react-redux";
import {  initLogin } from "../../actions/userActions";
export interface authHocProps {
  user?: any;
  history?: any;
  initLogin: () => void;
}
export interface authState {
  errors: object;
}
export default function(WrappedComponent) {
  class IsAuth extends Component<authHocProps, authState> {
    //   this line is magic, redirects to the dashboard after user signs up
    // this replace getDerivedStateFromPropss
    public static getDerivedStateFromProps(nextProps) {
      if (nextProps.user.isAuthenticated) {
        nextProps.history.push("/dashboard");
      }
      if (nextProps.errors) {
        return { errors: nextProps.errors };
      }
      return null;
    }
    public ourState: authState = {
      errors: {},
    };
    public componentDidMount() {
      this.props.initLogin();
      if (this.props.user.isAuthenticated) {
        this.props.history.push("/dashboard");
      }

    }
    public render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  const mapStateToProps = (state: any) => ({
    user: state.user,
  });
  const mapDispatchToProps = (dispatch: any) => ({
    initLogin: () => dispatch(initLogin()),
  });
  return connect(mapStateToProps, mapDispatchToProps)(IsAuth);
}
