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
        // its not fast enough so if im logged in, and go to login page, i will see a glimpse of the login page, and then it
        // redirects to the dashboad
        componentDidMount() {
            this.props.initLogin();
            // console.log("isAuth", this.props.user);
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
