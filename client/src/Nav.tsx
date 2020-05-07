import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, logOutInit, initGetNotifications } from "./actions/userActions";
import { history } from "./ourHistory";
import Router from "./Router";
export interface routerContainerState {
    hasError: boolean;
    messages: any[];
}
export interface routerContainerProps {
    getUser: () => void;
    logOutInit: (data) => void;
    darkTheme: () => void;
    initGetNotifications: (id: number) => void;
    user: {
        isAuthenticated: boolean;
    };
}
class Nav extends Component<routerContainerProps, routerContainerState> {
    state: routerContainerState = {
        hasError: false,
        messages: [],
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
    };

    render() {
        const { hasError } = this.state;
        return (
            <Router
                darkTheme={this.props.darkTheme}
                notifications={this.props.initGetNotifications}
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
    initGetNotifications: (id: number) => dispatch(initGetNotifications(id)),
});

const mapStateToProps = (state: any) => ({
    user: state.user,
});
export default connect(mapStateToProps, dispatchToProps)(Nav);
