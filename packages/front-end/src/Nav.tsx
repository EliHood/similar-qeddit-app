/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userActions } from '@mfe/redux-store'
import { history } from './ourHistory'
import Router from './Router'

export type routerContainerState = {
    hasError: boolean
}
export type routerContainerProps = {
    getUser: () => void
    logOutInit: (data) => void
    darkTheme: () => void
    initGetNotifications: (id: number) => void
    user: {
        isAuthenticated: boolean
        googleAccount: boolean
    }
}

class Nav extends Component<routerContainerProps, routerContainerState> {
    state: routerContainerState = {
        hasError: false,
    }

    componentDidMount() {
        this.props.getUser()
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
        })
    }

    ourLogOut = () => {
        this.props.logOutInit(history)
    }

    render() {
        const { hasError } = this.state
        return (
            <Router
                darkTheme={this.props.darkTheme}
                notifications={this.props.initGetNotifications}
                hasError={hasError}
                logOut={this.ourLogOut}
                googleAccount={this.props.user.googleAccount}
                isAuthenticated={this.props.user.isAuthenticated}
            />
        )
    }
}
const dispatchToProps = (dispatch: any) => ({
    getUser: () => dispatch(userActions.getUser()),
    logOutInit: (data: object) => dispatch(userActions.logOutInit(data)),
    initGetNotifications: (id: number) => dispatch(userActions.initGetNotifications(id)),
})

const mapStateToProps = (state: any) => ({
    user: state.user,
})
export default connect(mapStateToProps, dispatchToProps)(Nav)
