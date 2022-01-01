import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userActions } from '@mfe/redux-store/src'
import { AuthHocPropsType, AuthStateType } from '../types'

export default function (WrappedComponent) {
    class IsAuth extends Component<AuthHocPropsType, AuthStateType> {
        ourState: AuthStateType = {
            errors: {},
        }

        componentDidMount() {
            this.props.initLogin()
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state: any) => ({
        user: state.user,
    })
    const mapDispatchToProps = (dispatch: any) => ({
        initLogin: () => dispatch(userActions.initLogin()),
    })

    return connect(mapStateToProps, mapDispatchToProps)(IsAuth)
}
