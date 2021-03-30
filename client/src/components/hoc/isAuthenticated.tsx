import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initLogin } from '../../actions/userActions';
import { AuthHocPropsType, AuthStateType } from '../../utils/types';

export default function (WrappedComponent) {
  class IsAuth extends Component<AuthHocPropsType, AuthStateType> {
    ourState: AuthStateType = {
      errors: {},
    };

    componentDidMount() {
      this.props.initLogin();
    }

    render() {
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
