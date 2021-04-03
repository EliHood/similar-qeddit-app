import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IPrivateRoute } from './utils/types'

const PrivateRoute = ({
    googleAccount,
    isAuthenticated,
    Component,
    exact,
    path,
}: IPrivateRoute) => {
    if (googleAccount === true) {
        return <Route exact={exact} path={path} component={Component} />
    }
    if (isAuthenticated !== false) {
        return <Route exact={exact} path={path} component={Component} />
    }

    return <Redirect to={{ pathname: '/login' }} />
}

export default PrivateRoute
