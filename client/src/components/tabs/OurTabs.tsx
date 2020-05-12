import React from "react";
import PostList from "../forms/postList/postList";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import usePostsHook from "./../common/postsHook";
import useNotificationHook from "../common/notificationHook";
import { useDispatch, useSelector } from "react-redux";
import { likePostInit, dislikePostInit, deletePostInit, deleteCommentInit, editCommentInit, postCommentInit } from "./../../actions/postActions";
import { getIsNotified, getUser, getPopPosts, getPosts } from "./../../selectors/selectors";
import "./style.css";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <Typography component="div" role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}
function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        padding: "30px 0px",
        // width: '300px',
    },
}));

export default function OurTabs(props) {
    const classes = useStyles();
    usePostsHook();
    const [value, setValue] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    const dispatch = useDispatch();
    const user = useSelector(getUser());
    const isNotified = useSelector(getIsNotified());
    const [notifications] = useNotificationHook();
    const popPosts = useSelector(getPopPosts());
    const posts = useSelector(getPosts());
    const likePost = (id: number) => dispatch(likePostInit(id));
    const dislikePost = (id: number) => dispatch(dislikePostInit(id));
    const deletePost = (id: number, userId: number) => dispatch(deletePostInit(id, userId));
    const deleteComment = (id: number, postId: number, userId: number) => dispatch(deleteCommentInit(id, postId, userId));
    const postComment = (commentData: object) => dispatch(postCommentInit(commentData));
    const editComment = (commentData) => dispatch(editCommentInit(commentData));
    console.log("our props", props);
    return (
        <div className={classes.root}>
            <Grid container={true} justify="center">
                <Grid item={true} xs={12} sm={12} md={12} lg={9}>
                    <Tabs variant="fullWidth" className="tabMenu" value={value} onChange={handleChange}>
                        <Tab label="Trending" {...a11yProps(0)} />
                        <Tab label="Newest" {...a11yProps(1)} />
                    </Tabs>
                </Grid>
                <Grid item={true} xs={12} sm={12} md={12} lg={9}>
                    <TabPanel value={value} index={0}>
                        <PostList
                            likePost={likePost}
                            deletePost={deletePost}
                            deleteComment={deleteComment}
                            dislikePost={dislikePost}
                            posts={popPosts}
                            currentUser={user}
                            postComment={postComment}
                            isNotified={isNotified}
                            getNotifications={notifications}
                            editComment={editComment}
                        />
                    </TabPanel>
                </Grid>
                <Grid item={true} xs={12} sm={12} md={12} lg={9}>
                    <TabPanel value={value} index={1}>
                        <PostList
                            likePost={likePost}
                            deletePost={deletePost}
                            deleteComment={deleteComment}
                            dislikePost={dislikePost}
                            posts={posts}
                            currentUser={user}
                            postComment={postComment}
                            isNotified={isNotified}
                            getNotifications={notifications}
                            editComment={editComment}
                        />
                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    );
}
