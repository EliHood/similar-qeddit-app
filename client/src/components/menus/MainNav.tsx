import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Notification from "../../containers/notificationTooltip";
import { makeStyles } from "@material-ui/core/styles";
import menus from "./menu.json";
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
    const [, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const classes = styles();
    console.log("checking for props", props);
    return (
        <Grid item={true}>
            <div className={classes.buttonBar} id="appbar-collapse">
                <Fragment>
                    {props.isAuthenticated || props.googleAccount === true ? (
                        <Fragment>
                            {menus.menus.map((item, i) => (
                                <Fragment key={i}>
                                    {item.link !== "likes" && item.link !== "profile" && item.link !== "logout" && (
                                        <Button>
                                            <Link
                                                style={{
                                                    color: "#fff",
                                                    fontWeight: "500",
                                                    textDecoration: "none",
                                                }}
                                                to={`/${item.link}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </Button>
                                    )}
                                    {item.link === "likes" && (
                                        <Button>
                                            <Link
                                                style={{
                                                    color: "#fff",
                                                    textDecoration: "none",
                                                    fontWeight: "500",
                                                }}
                                                to={{
                                                    pathname: `/${props.user.id}/${item.link}`,
                                                }}
                                            >
                                                {item.name}
                                            </Link>
                                        </Button>
                                    )}
                                    {item.link === "profile" && (
                                        <Button>
                                            <Link
                                                style={{
                                                    color: "#fff",
                                                    fontWeight: "500",
                                                    textDecoration: "none",
                                                }}
                                                to={{
                                                    pathname: `/${item.link}/${props.user.username}`,
                                                }}
                                            >
                                                {item.name}
                                            </Link>
                                        </Button>
                                    )}
                                </Fragment>
                            ))}
                            <Button>
                                <Notification
                                    userId={props.currentUser.id}
                                    id={props.notificationId}
                                    handleClose={props.handleClose}
                                    open={props.open}
                                    anchorEl={props.anchorEl}
                                    handleNotificationClick={props.handleNotificationClick}
                                    title={"Notifications"}
                                />
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
                            {menus.guestMenu.map((item, i) => (
                                <Button key={i}>
                                    <Link
                                        style={{
                                            color: "#fff",
                                            fontWeight: "500",
                                            textDecoration: "none",
                                        }}
                                        to={`/${item.link}`}
                                    >
                                        {item.name}
                                    </Link>
                                </Button>
                            ))}
                        </Fragment>
                    )}
                </Fragment>
            </div>
        </Grid>
    );
}

export default MainNav;
