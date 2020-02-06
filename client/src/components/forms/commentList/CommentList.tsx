import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import OurListItem from "../../common/OurListItem";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import moment from "moment";
import React, { Fragment, useState } from "react";
export default function CommentList(props: any) {
    const [showMore, setShowMore] = useState<Number>(3);
    const [showLessFlag, setShowLessFlag] = useState<Boolean>(false);
    const showComments = (e) => {
        e.preventDefault();
        setShowMore(12);
        setShowLessFlag(true);
    };
    const showLessComments = (e) => {
        e.preventDefault();
        setShowMore(3);
        setShowLessFlag(false);
    };
    return (
        <Grid>
            {props.comments.slice(0, showMore).map((comment, i) => (
                <div key={i}>
                    <List style={{ paddingBottom: "20px" }}>
                        <OurListItem>
                            <Typography color="primary" align="left">
                                {comment.comment_body}
                            </Typography>
                            {comment.gifUrl && (
                                <div style={{ display: "block" }}>
                                    <img width="100%" height="300px" src={`${comment.gifUrl}`} />
                                </div>
                            )}
                        </OurListItem>
                        {props.user && props.user.user && comment.userId === props.user.user.id ? (
                            <Typography style={{ display: "inline-block", float: "right" }} align="right">
                                <span style={{ cursor: "pointer" }} onClick={() => props.deleteComment(comment.id, props.postId, comment.userId)}>
                                    <DeleteOutlineOutlinedIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Delete</span>
                                </span>
                            </Typography>
                        ) : null}
                        <Typography style={{ padding: "0px 0px" }} variant="caption" align="left">
                            {comment.author.username}
                        </Typography>
                        <Typography style={{ fontSize: "12px" }} variant="body1" align="left">
                            {moment(comment.createdAt).calendar()}
                        </Typography>
                        <Divider variant="fullWidth" component="li" />
                    </List>
                </div>
            ))}
            <Fragment>
                {props.comments.length > 3 && showLessFlag === false ? (
                    <Button onClick={(e) => showComments(e)} variant="outlined" component="span" color="primary">
                        Show More Comments
                    </Button>
                ) : (
                    <Fragment>
                        {props.comments.length > 3 && (
                            <Button onClick={(e) => showLessComments(e)} variant="outlined" component="span" color="primary">
                                Show Less Comments
                            </Button>
                        )}
                    </Fragment>
                )}
            </Fragment>
        </Grid>
    );
}
