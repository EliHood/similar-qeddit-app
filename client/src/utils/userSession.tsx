import jwt_decode from "jwt-decode";
import { loginSuccess, logOutInit, getCurrentUser } from "../actions/userActions";
import { store } from "../store";
import { setAuthToken } from "./";
import { history } from "./../ourHistory";
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
        store.dispatch(getCurrentUser());
        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.iat > currentTime) {
          // Logout user
          store.dispatch(logOutInit(history));
          // Redirect to login
          localStorage.clear()
          window.location.href = "/login";
        }
      }
    }
  },
};
