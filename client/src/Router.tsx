import React, { Fragment } from "react";
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
import EditProfile from "./components/editProfile/editProfile";
import Profile from "./components/profile/profile";
import Register from "./components/register/register";
import { history } from "./ourHistory";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./components/404/404";
import CollapasedMenu from "./components/menus/CollapsedMenu";
import MainNav from "./components/menus/MainNav";
import useWrapperSlide from "./common/useWrapperSlide";
import Search from "./components/search/Search";
import UserPosts from "./containers/UserPosts";
import storehooks from "./common/storeHooks";
import OurLink from "./common/OurLink";
import SearchResults from "./common/SearchResults";
import SearchResultPage from "./components/searchResultPage/searchResultPage";
function MyRouter(props) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const { classes, appOpen, appSetOpen } = useWrapperSlide();
    const { postResults, query } = storehooks();
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        props.notifications(user.id);
    };
    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);
    const user = props.currentUser.user ? props.currentUser.user : "";
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
                <Toolbar style={{ height: "1px" }}>
                    <Grid item={true} lg={2} style={{ flex: 1 }}>
                        <Typography style={{ color: "#fff" }} variant="subtitle1" color="secondary">
                            TypeScript React
                        </Typography>
                    </Grid>
                    <Grid item={true} lg={8} style={{ flex: 1 }}>
                        <Search {...props} />
                        <SearchResults />
                    </Grid>

                    <CollapasedMenu setOpen={appSetOpen} appOpen={appOpen} user={user} handleNotificationClick={handleNotificationClick} {...props} />
                    <MainNav {...props} handleClose={handleClose} user={user} open={open} notificationId={id} anchorEl={anchorEl} handleNotificationClick={handleNotificationClick} />
                </Toolbar>
            </AppBar>

            <Switch>
                <Route exact={true} path="/" render={() => <Landing {...props} {...classes} appOpen={appOpen} />} />
                <Route
                    path="/login"
                    render={() => (props.isAuthenticated === true || props.googleAccount === true ? <Redirect to="/dashboard" /> : <Login {...props} {...classes} appOpen={appOpen} />)}
                />
                <Route
                    path="/register"
                    render={() => (props.isAuthenticated === true || props.googleAccount === true ? <Redirect to="/dashboard" /> : <Register {...props} {...classes} appOpen={appOpen} />)}
                />
                <Route path="/emailConfirmation" component={EmailConfirmation} {...props} />
                {/* <Route path='/resendEmailConfirmation'></Route> */}
                <Route exact={true} path="/search/posts" component={SearchResultPage} {...props} {...classes} />
                <Route path="/emailConfirmationSuccess/:userId/:token" component={EmailConfirmationSuccess} {...props} />
                <PrivateRoute exact={true} path="/dashboard" component={Dashboard} {...props} {...classes} appOpen={appOpen} />
                <PrivateRoute exact={true} path="/profile/:username" component={Profile} {...props} {...classes} appOpen={appOpen} />
                <PrivateRoute exact={true} path="/editProfile" component={EditProfile} {...props} {...classes} appOpen={appOpen} />
                <PrivateRoute exact={true} path="/:userId/likes" component={Likes} {...props} {...classes} appOpen={appOpen} />
                <PrivateRoute exact={true} path="/:userId/posts" component={UserPosts} {...props} {...classes} appOpen={appOpen} />
                <Route path="/post/:id" component={Post} {...props} {...classes} appOpen={appOpen} />

                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default MyRouter;
