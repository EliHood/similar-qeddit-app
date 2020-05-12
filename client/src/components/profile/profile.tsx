import React, { useEffect, useRef, Fragment } from "react";
import { Button, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PersonIcon from "@material-ui/icons/Person";
import OurLink from "../common/OurLink";
import GridHoc from "../hoc/grid";
import { useSelector, useDispatch } from "react-redux";
import { getProfileInit, followUserInit, unfollowUserInit } from "../../actions/userActions";
import { userStore } from "../../selectors/selectors";
export interface profileProps {
    getProfileInit: (username: string) => void;
    unfollowUserInit: (username: string, id: number) => void;
    followUserInit: (username: string, id: number) => void;
    username: string;
    match: any;
    user: any;
    currentUser: {
        user: {
            id: number;
        };
    };
}
function Profile(props: profileProps) {
    const didMountRef = useRef<Object>();
    const dispatch = useDispatch();
    const followUser = (username: string, id: number) => dispatch(followUserInit(username, id));
    const unfollowUser = (username: string, id: number) => dispatch(unfollowUserInit(username, id));
    const userData = useSelector(userStore());
    useEffect(() => {
        if (!didMountRef.current) {
            const username = props.match.params.username;
            dispatch(getProfileInit(username));
        } else {
            console.log("test");
        }
    }, []);

    const user = userData.profilePage;
    console.log("dsddsd", user);
    const currentUser = userData.currentUser.user;
    const userFollowerCount = user && user.UserFollowers ? user.UserFollowers.length : "";
    const followerPlural = userFollowerCount.length > 1 ? "Follower" : "Followers";
    return (
        <Fragment>
            {/* <Typography variant="h6" style={{ margin: "20px 0px" }}>Your Profile</Typography> */}
            {currentUser && user && (
                <Fragment>
                    <Avatar src={user.gravatar} />
                    <Grid item={true} sm={12} md={12} style={{ margin: "20px 0px" }}>
                        <Typography variant="h5">{user.username}</Typography>
                        <Typography variant="body1" style={{ margin: "20px 0px", letterSpacing: "1px" }}>
                            <PersonIcon style={{ margin: "-5px 0px" }} /> {user.bio}
                        </Typography>
                        <Grid item={true} sm={2} lg={2} style={{ margin: "20px 0px" }}>
                            {currentUser.id !== user.id ? (
                                <Typography align="left">
                                    {user.isFollowing !== true ? (
                                        <Button variant="outlined" color="primary" onClick={() => followUser(user.username, currentUser.id)}>
                                            Follow
                                        </Button>
                                    ) : (
                                        <Button style={{ color: "#fff" }} variant="contained" color="primary" onClick={() => unfollowUser(user.username, currentUser.id)}>
                                            Following
                                        </Button>
                                    )}
                                </Typography>
                            ) : null}
                        </Grid>
                        <Grid item={true} sm={12} md={12}>
                            <Typography variant="h6" style={{ margin: "10px 0px" }}>
                                {" "}
                                {userFollowerCount} {followerPlural}{" "}
                            </Typography>
                            {user && userFollowerCount ? (
                                <Fragment>
                                    {user.UserFollowers.map((followUser, i) => (
                                        <Fragment key={i}>
                                            <Paper style={{ margin: "30px 0px", padding: "20px 0px" }}>
                                                <Typography style={{ padding: "0px 20px" }} variant="caption">
                                                    <OurLink
                                                        to={{
                                                            pathname: `/profile/${user && followUser && followUser.followerDetails ? followUser.followerDetails.username : ""}`,
                                                            state: { followUser },
                                                        }}
                                                        title={user && followUser && followUser.followerDetails ? followUser.followerDetails.username : ""}
                                                    />
                                                </Typography>
                                            </Paper>
                                        </Fragment>
                                    ))}
                                </Fragment>
                            ) : null}
                        </Grid>
                    </Grid>
                </Fragment>
            )}
        </Fragment>
    );
}

export default GridHoc(Profile);
