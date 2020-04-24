import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
const CommentItem = (props) => (
    <Fragment>
        <Typography style={{ display: "block" }} color="primary" align="left">
            {props.comment.comment_body}
        </Typography>
        {props.comment.gifUrl && (
            <div style={{ display: "block" }}>
                <img width="100%" height="300px" src={`${props.comment.gifUrl}`} />
            </div>
        )}
    </Fragment>
);
export default CommentItem;
