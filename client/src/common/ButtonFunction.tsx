import React, { Fragment, useState } from "react";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Typography from "@material-ui/core/Typography";
import ReplyIcon from "@material-ui/icons/Reply";
import storeHooks from "./storeHooks";
import {ButtonFunctionProps } from '../utils/types';
const ButtonFunction: React.FC<ButtonFunctionProps> = ({ type, onReply, update, postId, userId, commentId, comment, setEditComment, deleteReply, replyId, replyUserId }) => {
    const { deleteComment } = storeHooks();
    return (
        <Fragment>
            {type === "reply" && (
                <span style={{ cursor: "pointer", paddingRight: "20px" }} onClick={() => onReply?.()}>
                    <ReplyIcon color="primary" style={{ margin: "-5px 0px" }} /> <span>Reply</span>
                </span>
            )}
            {type === "delete" && (
                <span style={{ cursor: "pointer" }} onClick={() => deleteComment(commentId, postId, userId)}>
                    <DeleteOutlineOutlinedIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Delete</span>
                </span>
            )}
            {type === "edit" && (
                <span style={{ cursor: "pointer" }} onClick={() => setEditComment?.(true)}>
                    <EditIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Edit</span>
                </span>
            )}
            {type === "cancel" && (
                <span style={{ cursor: "pointer", paddingRight: "20px" }} onClick={() => setEditComment?.(false)}>
                    <ClearIcon style={{ margin: "-7px 0px" }} color="primary" /> <span>Cancel</span>
                </span>
            )}
            {type === "update" && (
                <span style={{ cursor: "pointer" }} onClick={() => update?.(comment)}>
                    <AddCircleOutlineIcon style={{ margin: "-7px 0px" }} color="primary" /> <span>Update</span>
                </span>
            )}
            {type === "deleteReply" && (
                <Typography style={{ display: "inline-block", float: "right" }} align="right">
                    <span style={{ cursor: "pointer" }} onClick={() => deleteReply?.(replyId, postId, replyUserId, commentId)}>
                        <DeleteOutlineOutlinedIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Delete</span>
                    </span>
                </Typography>
            )}
        </Fragment>
    );
};

export default ButtonFunction;
