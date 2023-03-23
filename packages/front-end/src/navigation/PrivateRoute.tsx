import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IPrivateRoute } from '@mfe/redux-store/src/types'

const PrivateRoute = ({
    googleAccount,
    isAuthenticated,
    Component,
    exact,
    path,
}: IPrivateRoute) => {
    console.log('googleAccount', googleAccount)

    if (googleAccount === true) {
        return <Route exact={exact} path={path} component={Component as any} />
    }
    if (isAuthenticated !== false) {
        return <Route exact={exact} path={path} component={Component as any} />
    }

    return <Redirect to={{ pathname: '/login' }} />
}

export default PrivateRoute
