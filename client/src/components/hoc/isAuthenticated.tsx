import React, { Component } from "react";
import { connect } from "react-redux";
import { initLogin } from "../../actions/userActions";

export interface authHocProps {
    user?: any;
    history?: any;
    initLogin: () => void;
}
export interface authState {
    errors: object;
}

// this just clears out the login messages, redirect logic is in <Router/>
export default function(WrappedComponent) {
    class IsAuth extends Component<authHocProps, authState> {
        ourState: authState = {
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
