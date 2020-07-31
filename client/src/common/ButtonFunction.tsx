import React, { Fragment, useState } from "react";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Typography from "@material-ui/core/Typography";
import ReplyIcon from "@material-ui/icons/Reply";
import storeHooks from "./storeHooks";
type ButtonFunctionProps = {
    type: "edit" | "reply" | "delete" | "cancel" | "update" | "deleteReply";
    onReply?: any;
    update?: any;
    postId?: number | any;
    userId?: number | any;
    commentId?: number | any;
    comment?: any;
    setEditComment?: any;
    deleteReply?: any;
    replyId?: number;
    replyUserId?: number;
};

const ButtonFunction: React.FC<ButtonFunctionProps> = (props) => {
    const { deleteComment } = storeHooks();
    return (
        <Fragment>
            {props.type === "reply" && (
                <span style={{ cursor: "pointer", paddingRight: "20px" }} onClick={() => props.onReply()}>
                    <ReplyIcon color="primary" style={{ margin: "-5px 0px" }} /> <span>Reply</span>
                </span>
            )}
            {props.type === "delete" && (
                <span style={{ cursor: "pointer" }} onClick={() => deleteComment(props.commentId, props.postId, props.userId)}>
                    <DeleteOutlineOutlinedIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Delete</span>
                </span>
            )}
            {props.type === "edit" && (
                <span style={{ cursor: "pointer" }} onClick={() => props.setEditComment(true)}>
                    <EditIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Edit</span>
                </span>
            )}
            {props.type === "cancel" && (
                <span style={{ cursor: "pointer", paddingRight: "20px" }} onClick={() => props.setEditComment(false)}>
                    <ClearIcon style={{ margin: "-7px 0px" }} color="primary" /> <span>Cancel</span>
                </span>
            )}
            {props.type === "update" && (
                <span style={{ cursor: "pointer" }} onClick={() => props.update(props.comment)}>
                    <AddCircleOutlineIcon style={{ margin: "-7px 0px" }} color="primary" /> <span>Update</span>
                </span>
            )}
            {props.type === "deleteReply" && (
                <Typography style={{ display: "inline-block", float: "right" }} align="right">
                    <span style={{ cursor: "pointer" }} onClick={() => props.deleteReply(props.replyId, props.postId, props.replyUserId, props.commentId)}>
                        <DeleteOutlineOutlinedIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Delete</span>
                    </span>
                </Typography>
            )}
        </Fragment>
    );
};

export default ButtonFunction;
