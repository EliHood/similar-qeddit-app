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
export default function(WrappedComponent) {
    class IsAuth extends Component<authHocProps, authState> {
        ourState: authState = {
            errors: {},
        };
        componentDidUpdate(prevProps) {
            if (prevProps.user.isAuthenticated !== this.props.user.isAuthenticated || prevProps.user.googleAccount !== this.props.user.googleAccount) {
                this.props.history.push("/dashboard");
            }
        }
        componentDidMount() {
            this.props.initLogin();
            console.log("isAuth", this.props.user);
            if (this.props.user.isAuthenticated || this.props.user.googleAccount) {
                this.props.history.push("/dashboard");
            }
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
