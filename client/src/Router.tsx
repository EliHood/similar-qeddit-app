import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { Fragment } from "react";
import { Link, Route, Router, Switch } from "react-router-dom";
import Landing from "./components/landing/landing";
import Dashboard from "./containers/dashboard";
import EmailConfirmation from './containers/emailConfirmation'
import Likes from './containers/Likes';
import EmailConfirmationSuccess from './containers/emailConfirmationSuccess'
import Login from "./containers/login";
import Post from "./containers/postPage";
import EditProfile from "./containers/profile";
import Register from "./containers/signup";
import { history } from "./ourHistory";
import PrivateRoute from "./PrivateRoute";
const MyRouter = (props) => {
  const user = props.currentUser.user ? props.currentUser.user : ''
  return props.hasError ? (
    <div>Error</div>
  ) : (
      <Router history={history}>
        <AppBar position="static">
          <Toolbar>
            <Grid justify="space-between" container={true}>
              <Typography variant="h6" style={{ color: "#fff" }}>
                TypeScript React App
              </Typography>
              <Grid item={true}>
                {props.user ? (
                  <Fragment>
                    <Button>
                      <Link
                        style={{
                          color: "#fff",
                          fontWeight: "500",
                          textDecoration: "none",
                        }}
                        to="/"
                      >
                        Home
                      </Link>
                    </Button>
                    <Button>
                      <Link
                        style={{
                          color: "#fff",
                          textDecoration: "none",
                          fontWeight: "500",
                        }}
                        to="/dashboard"
                      >
                        Dashboard
                      </Link>
                    </Button>
                    <Button>
                      <Link
                        style={{
                          color: "#fff",
                          textDecoration: "none",
                          fontWeight: "500",
                        }}
                        to={{
                          pathname: `/${user.id}/likes`,
                        }}
                      >
                        Your Likes
                      </Link>
                    </Button>
                    <Button>
                      <Link
                        style={{
                          color: "#fff",
                          fontWeight: "500",
                          textDecoration: "none",
                        }}
                        to="/editProfile"
                      >
                        Edit Profile
                      </Link>
                    </Button>
                    <Button style={{ color: "#fff" }} onClick={props.logOut}>
                      Logout
                    </Button>
                  </Fragment>
                ) : (
                    <Fragment>
                      <Button>
                        <Link style={{
                          color: "#fff",
                          fontWeight: "500",
                          textDecoration: "none"
                        }} to="/">Home</Link>
                      </Button>
                      <Button>
                        <Link style={{
                          color: "#fff",
                          fontWeight: "500",
                          textDecoration: "none"
                        }} to="/register">Sign Up</Link>
                      </Button>
                      <Button>
                        <Link style={{
                          color: "#fff",
                          fontWeight: "500",
                          textDecoration: "none"
                        }} to="/login">Log In</Link>
                      </Button>
                    </Fragment>
                  )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact={true} path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/emailConfirmation" component={EmailConfirmation} {...props} />
          {/* <Route path='/resendEmailConfirmation'></Route> */}
          <Route path='/emailConfirmationSuccess/:userId/:token' component={EmailConfirmationSuccess} {...props} />
          <PrivateRoute exact={true} path="/editProfile" component={EditProfile} {...props} />
          <PrivateRoute exact={true} path="/:userId/likes" component={Likes} {...props} />
          <PrivateRoute exact={true} path="/dashboard" component={Dashboard} {...props} />
          <PrivateRoute path="/post/:id" component={Post} {...props} />
        </Switch>
      </Router>
    );

}

export default MyRouter;
