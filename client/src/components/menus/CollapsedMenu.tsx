import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import OurMenu from "./Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Notification from "../../containers/notificationTooltip";
import OurMenuItem from "../../common/OurMenuItem";
function CollapasedMenu(props: any) {
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
                        <OurMenuItem>
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
                        </OurMenuItem>

                        <OurMenuItem>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    fontWeight: "500",
                                }}
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>
                        </OurMenuItem>

                        <OurMenuItem>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    fontWeight: "500",
                                }}
                                to={{
                                    pathname: `/${user.id}/likes`,
                                }}
                            >
                                Your Likes
                            </Link>
                        </OurMenuItem>
                        <OurMenuItem>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    fontWeight: "500",
                                }}
                                to={{
                                    pathname: `/${user.id}/posts`,
                                }}
                            >
                                Your Posts
                            </Link>
                        </OurMenuItem>
                        <OurMenuItem>
                            <Link
                                style={{
                                    fontWeight: "500",
                                    textDecoration: "none",
                                }}
                                to="/editProfile"
                            >
                                Edit Profile
                            </Link>
                        </OurMenuItem>
                        <OurMenuItem>
                            <Notification
                                userId={user.id}
                                id={props.notificationId}
                                handleClose={handleClose}
                                open={props.open}
                                anchorEl={props.anchorEl}
                                handleNotificationClick={props.handleNotificationClick}
                                title={"Notifications"}
                            />
                        </OurMenuItem>

                        <OurMenuItem>
                            <Link
                                style={{
                                    fontWeight: "500",
                                    textDecoration: "none",
                                }}
                                to={{
                                    pathname: `/profile/${user.username}`,
                                }}
                            >
                                Profile
                            </Link>
                        </OurMenuItem>

                        <OurMenuItem>
                            <span onClick={props.darkTheme}>Change Theme</span>
                        </OurMenuItem>

                        <OurMenuItem>
                            <span onClick={props.logOut}>Log Out</span>
                        </OurMenuItem>
                    </Fragment>
                ) : (
                    <Fragment>
                        <OurMenuItem style={{ margin: "20px" }}>
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
                        </OurMenuItem>
                        <OurMenuItem style={{ margin: "20px" }}>
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
                        </OurMenuItem>
                        <OurMenuItem style={{ margin: "20px" }}>
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
                        </OurMenuItem>
                    </Fragment>
                )}
            </OurMenu>
        </Grid>
    );
}

export default CollapasedMenu;
