import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import OurMenu from "./Menu";
import { MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import Notification from "../../containers/notificationTooltip";
function CollapasedMenu(props: any) {
    const [] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const user = props.currentUser.user ? props.currentUser.user : "";

    return (
        <Grid item={true}>
            <OurMenu appOpen={props.appOpen} setOpen={props.setOpen}>
                {props.isAuthenticated || props.googleAccount === true ? (
                    <Fragment>
                        <MenuItem>
                            <Link
                                style={{
                                    fontWeight: "500",
                                    textDecoration: "none",
                                }}
                                to="/"
                                color="primary"
                            >
                                Home
                            </Link>
                        </MenuItem>

                        <MenuItem>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    fontWeight: "500",
                                }}
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>
                        </MenuItem>

                        <MenuItem>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    fontWeight: "500",
                                }}
                                to={{
                                    pathname: `/${props.currentUser.id}/likes`,
                                }}
                            >
                                Your Likes
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                style={{
                                    fontWeight: "500",
                                    textDecoration: "none",
                                }}
                                to="/editProfile"
                            >
                                Edit Profile
                            </Link>
                        </MenuItem>

                        <Notification
                            userId={user.id}
                            id={props.notificationId}
                            handleClose={handleClose}
                            open={props.open}
                            anchorEl={props.anchorEl}
                            handleNotificationClick={props.handleNotificationClick}
                            title={"Notifications"}
                        />

                        <MenuItem>
                            <Link
                                style={{
                                    fontWeight: "500",
                                    textDecoration: "none",
                                }}
                                to={{
                                    pathname: `/profile/${props.currentUser.username}`,
                                }}
                            >
                                Profile
                            </Link>
                        </MenuItem>

                        <MenuItem onClick={props.darkTheme}>Change Theme</MenuItem>
                        <MenuItem onClick={props.logOut}>Logout</MenuItem>
                    </Fragment>
                ) : (
                    <Fragment>
                        <MenuItem>
                            <Link
                                style={{
                                    color: "#333",
                                    fontWeight: "500",
                                    textDecoration: "none",
                                }}
                                to="/"
                            >
                                Home
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                style={{
                                    color: "#333",
                                    fontWeight: "500",
                                    textDecoration: "none",
                                }}
                                to="/login"
                            >
                                Login
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                style={{
                                    color: "#333",
                                    fontWeight: "500",
                                    textDecoration: "none",
                                }}
                                to="/register"
                            >
                                Register
                            </Link>
                        </MenuItem>
                    </Fragment>
                )}
            </OurMenu>
        </Grid>
    );
}

export default CollapasedMenu;
