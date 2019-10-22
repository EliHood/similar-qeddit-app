import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { sessionData } from "./utils";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionData.getLoginStatus() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);
export default PrivateRoute;
