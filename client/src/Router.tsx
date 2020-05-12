import React from "react";
import * as classnames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Route, Router, Redirect, Switch } from "react-router-dom";
import Landing from "./components/landing/landing";
import Dashboard from "./components/dashboard/dashboard";
import EmailConfirmation from "./components/emailConfirmation/emailConfirmation";
import EmailConfirmationSuccess from "./components/emailConfirmationSuccess/emailConfirmationSuccess";
import Likes from "./containers/Likes";
import Login from "./components/login/login";
import Post from "./components/post/post";
import EditProfile from "./containers/profile";
import Profile from "./components/profile/profile";
import Register from "./components/register/register";
import { history } from "./ourHistory";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./components/404/404";
import { makeStyles } from "@material-ui/core/styles";
import CollapasedMenu from "./components/menus/CollapsedMenu";
import MainNav from "./components/menus/MainNav";
const drawerWidth = 240;
const styles = makeStyles((theme) => ({
    buttonBar: {
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
        margin: "10px",
        paddingLeft: "16px",
        right: 0,
        // position: "relative",
        width: "100%",
        background: "transparent",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

function MyRouter(props) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [appOpen, appSetOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        props.notifications(user.id);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const classes = styles();
    const user = props.currentUser.user ? props.currentUser.user : "";
    console.log("balh", anchorEl);
    return props.hasError ? (
        <div>Error</div>
    ) : (
        <Router history={history}>
            <AppBar
                position="static"
                className={classnames(
                    (classes.appBar,
                    {
                        [classes.appBarShift]: appOpen,
                    }),
                )}
            >
                <Toolbar>
                    <Grid item={true} style={{ flex: 1 }}>
                        <Typography style={{ color: "#fff" }} variant="subtitle1" color="secondary">
                            TypeScript React
                        </Typography>
                    </Grid>

                    <CollapasedMenu setOpen={appSetOpen} appOpen={appOpen} user={user} handleNotificationClick={handleNotificationClick} {...props} />
                    <MainNav {...props} handleClose={handleClose} user={user} open={open} notificationId={id} anchorEl={anchorEl} handleNotificationClick={handleNotificationClick} />
                </Toolbar>
            </AppBar>
            <Switch>
                <Route exact={true} path="/" component={Landing} {...props} />
                <Route path="/login" render={() => (props.isAuthenticated === true || props.googleAccount === true ? <Redirect to="/dashboard" /> : <Login />)} />
                <Route path="/register" render={() => (props.isAuthenticated === true || props.googleAccount === true ? <Redirect to="/dashboard" /> : <Register />)} />
                <Route path="/emailConfirmation" component={EmailConfirmation} {...props} />
                {/* <Route path='/resendEmailConfirmation'></Route> */}
                <Route path="/emailConfirmationSuccess/:userId/:token" component={EmailConfirmationSuccess} {...props} />
                <PrivateRoute exact={true} path="/dashboard" component={Dashboard} {...props} />
                <PrivateRoute exact={true} path="/profile/:username" component={Profile} {...props} />
                <PrivateRoute exact={true} path="/editProfile" component={EditProfile} {...props} />
                <PrivateRoute exact={true} path="/:userId/likes" component={Likes} {...props} />
                <PrivateRoute path="/post/:id" component={Post} {...props} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default MyRouter;
