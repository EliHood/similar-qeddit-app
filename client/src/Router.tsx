import React from "react";
import {
  HashRouter,
  Route,
  BrowserRouter as Router,
  Link,
  Switch
} from "react-router-dom";
import Landing from "./components/landing/landing";
import Register from "./containers/signup";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
const MyRouter = () => (
  <Router history={null}>
    <HashRouter>
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Typography variant="h6" style={{ color: "#fff" }}>
              TypeScript React App
            </Typography>
            <Grid item>
              <Button>
                <Link to="/">Home</Link>
              </Button>
              <Button>
                <Link to="/register">Sign Up</Link>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={Register} />
      </Switch>
    </HashRouter>
  </Router>
);

export default MyRouter;
