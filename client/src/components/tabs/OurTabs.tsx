import Box from "@material-ui/core/Box";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import PostList from "../forms/postList/postList";
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
    const [value, setValue] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Trending" {...a11yProps(0)} />
                <Tab label="Newest" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <PostList
                    likePost={props.likePost}
                    deletePost={props.deletePostInit}
                    deleteComment={props.deleteComment}
                    dislikePost={props.dislikePost}
                    posts={props.popPosts}
                    currentUser={props.user}
                    postComment={props.postCommentInit}
                    isNotified={props.isNotified}
                    getNotifications={props.notificationInit}
                    notification={props.notification}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PostList
                    likePost={props.likePost}
                    dislikePost={props.dislikePost}
                    deleteComment={props.deleteComment}
                    deletePost={props.deletePostInit}
                    posts={props.posts}
                    currentUser={props.user}
                    postComment={props.postCommentInit}
                    isNotified={props.isNotified}
                    getNotifications={props.notificationInit}
                    notification={props.notification}
                />
            </TabPanel>
        </div>
    );
}
