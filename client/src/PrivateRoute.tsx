import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGoogleAccount } from "./selectors/selectors";

const PrivateRoute = ({ component: Component, ...rest }) => {
    // const isGoogleAccount = useSelector(getGoogleAccount());
    console.log("checking rest", rest, Component);
    // if user signed up and verified account, give user access to all authenticated routes,
    // of if user signed up using google oauth, give user access to all authenticated routes
    return <Route {...rest} render={(props) => (rest.googleAccount !== null || rest.isAuthenticated !== false ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />)} />;
};

export default PrivateRoute;
