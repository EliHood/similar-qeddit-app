import React from "react";
import { Route, Redirect } from "react-router-dom";
import { sessionData } from "./utils";
console.log(sessionData.getLoginStatus());
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
