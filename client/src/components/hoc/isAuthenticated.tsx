import React, { Component } from "react";
import { connect } from "react-redux";

export interface authHocProps {
  user?: any;
  history?: any;
}
export interface authState {
  errors: object;
}
export default function(WrappedComponent) {
  class IsAuth extends Component<authHocProps, authState> {
    ourState: authState = {
      errors: {}
    };
    componentDidMount() {
      if (this.props.user.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
      console.log(this.props);
    }
    //   this line is magic, redirects to the dashboard after user signs up
    // this replace getDerivedStateFromPropss
    static getDerivedStateFromProps(nextProps) {
      if (nextProps.user.isAuthenticated) {
        nextProps.history.push("/dashboard");
      }
      if (nextProps.errors) {
        return { errors: nextProps.errors };
      }
      return null;
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  const mapStateToProps = (state: any) => ({
    user: state.user
  });
  return connect(mapStateToProps)(IsAuth);
}
