import jwt_decode from "jwt-decode";
import { loginSuccess, logOutInit } from "../actions/userActions";
import { store } from "../store";
import { setAuthToken } from "./";
export default {
  userSession: () => {
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and exp
      const token = localStorage.getItem("jwtToken");
      if (token !== "null") {
        const decoded = jwt_decode(token);
        // Set user and isAuthenticated
        store.dispatch(loginSuccess(decoded));
        // store.dispatch(getUser());
        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.iat > currentTime) {
          // Logout user
          store.dispatch(logOutInit());
          // Redirect to login
          window.location.href = "/login";
        }
      }
    }
  },
};
