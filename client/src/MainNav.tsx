import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import OurMenu from "./Menu";
import MenuIcon from "@material-ui/icons/Menu";
import { MenuItem } from "@material-ui/core";
import { Link, Route, Router, Redirect, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Notification from "./containers/notificationTooltip";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as classnames from "classnames";

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

function MainNav(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const classes = styles();
    console.log("checking for props", props);
    return (
        <Grid item={true}>
            <div className={classes.buttonBar} id="appbar-collapse">
                <Fragment>
                    {props.isAuthenticated || props.googleAccount === true ? (
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
                                        pathname: `/${props.user.id}/likes`,
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

                            <Notification
                                userId={props.currentUser.id}
                                id={props.notificationId}
                                handleClose={props.handleClose}
                                open={props.open}
                                anchorEl={props.anchorEl}
                                handleNotificationClick={props.handleNotificationClick}
                                title={"Notifications"}
                            />

                            <Button>
                                <Link
                                    style={{
                                        color: "#fff",
                                        fontWeight: "500",
                                        textDecoration: "none",
                                    }}
                                    to={{
                                        pathname: `/profile/${props.user.username}`,
                                    }}
                                >
                                    Profile
                                </Link>
                            </Button>
                            <Button style={{ color: "#fff" }} onClick={props.darkTheme}>
                                Change Theme
                            </Button>
                            <Button style={{ color: "#fff" }} onClick={props.logOut}>
                                Logout
                            </Button>
                        </Fragment>
                    ) : (
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
                                        fontWeight: "500",
                                        textDecoration: "none",
                                    }}
                                    to="/register"
                                >
                                    Sign Up
                                </Link>
                            </Button>
                            <Button>
                                <Link
                                    style={{
                                        color: "#fff",
                                        fontWeight: "500",
                                        textDecoration: "none",
                                    }}
                                    to="/login"
                                >
                                    Log In
                                </Link>
                            </Button>
                        </Fragment>
                    )}
                </Fragment>
            </div>
        </Grid>
    );
}

export default MainNav;
