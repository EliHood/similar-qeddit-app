import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const isGoogleAccount = useSelector(getGoogleAccount())

  // if user signed up and verified account, give user access to all authenticated routes,
  // of if user signed up using google oauth, give user access to all authenticated routes
  if (rest.googleAccount === true) {
    return <Route {...rest} render={(props) => <Component {...rest} {...props} />} />;
  } if (rest.isAuthenticated !== false) {
    return <Route {...rest} render={(props) => <Component {...rest} {...props} />} />;
  }

  return <Redirect to={{ pathname: '/login' }} />;
};

export default PrivateRoute;
