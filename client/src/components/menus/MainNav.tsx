import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Notification from "../../containers/notificationTooltip";
import { makeStyles } from "@material-ui/core/styles";
import menus from "./menu.json";
import NavLink from "../../common/NavLink";
import NavButton from "../../common/NavButton";
const drawerWidth = 210;
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
    return (
        <Grid item={true}>
            <div className={classes.buttonBar} id="appbar-collapse">
                <Fragment>
                    {props.isAuthenticated || props.googleAccount === true ? (
                        <Fragment>
                            <ul style={{ display: "flex", flexDirection: "row", flexWrap: "wrap-reverse", paddingRight: "20px", justifyContent: "flex-end", listStyleType: "none" }}>
                                {menus.menus.map((item, i) => (
                                    <li key={i} style={{ padding: "0.5rem" }}>
                                        {item.link !== "likes" && item.link !== "posts" && item.link !== "profile" && item.link !== "logout" && <NavLink to={`/${item.link}`}>{item.name}</NavLink>}
                                        {item.link === "likes" && (
                                            <NavLink
                                                to={{
                                                    pathname: `/${props.user.id}/${item.link}`,
                                                }}
                                            >
                                                {item.name}
                                            </NavLink>
                                        )}
                                        {item.link === "profile" && (
                                            <NavLink
                                                to={{
                                                    pathname: `/${item.link}/${props.user.username}`,
                                                }}
                                            >
                                                {item.name}
                                            </NavLink>
                                        )}
                                        {item.link === "posts" && (
                                            <NavLink
                                                to={{
                                                    pathname: `/${props.user.id}/${item.link}`,
                                                }}
                                            >
                                                {item.name}
                                            </NavLink>
                                        )}
                                    </li>
                                ))}

                                <NavButton>
                                    <Notification
                                        userId={props.currentUser.id}
                                        id={props.notificationId}
                                        handleClose={props.handleClose}
                                        open={props.open}
                                        anchorEl={props.anchorEl}
                                        handleNotificationClick={props.handleNotificationClick}
                                        title={"Notifications"}
                                    />
                                </NavButton>

                                <NavButton onClick={props.darkTheme}>Change Theme</NavButton>

                                <NavButton onClick={props.logOut}>Logout</NavButton>
                            </ul>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <ul style={{ display: "flex", flexDirection: "row", flexWrap: "wrap-reverse", paddingRight: "20px", justifyContent: "flex-end", listStyleType: "none" }}>
                                {menus.guestMenu.map((item, i) => (
                                    <li style={{ padding: "0.5rem" }}>
                                        <NavLink to={`/${item.link}`}>{item.name}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </Fragment>
                    )}
                </Fragment>
            </div>
        </Grid>
    );
}

export default MainNav;
