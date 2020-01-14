import React from "react";
import { Redirect, Route } from "react-router-dom";
import { sessionData } from "./utils";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
       rest.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);
export default PrivateRoute;
