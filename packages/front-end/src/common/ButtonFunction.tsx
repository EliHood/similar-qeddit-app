import React, { Fragment, useState } from 'react'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Typography from '@material-ui/core/Typography'
import ReplyIcon from '@material-ui/icons/Reply'
import styled from 'styled-components'
import storeHooks from './storeHooks'
import { ButtonFunctionProps } from '../types'

const ButtonSpan = styled.span`
    cursor: pointer;
    padding-right: 20px;
`

const ButtonFunction: React.FC<ButtonFunctionProps> = ({
    type,
    onReply,
    update,
    postId,
    userId,
    comment,
    setEditComment,
    deleteReply,
    replyId,
    replyUserId,
}) => {
    const { deleteComment } = storeHooks()
    return (
        <>
            {type === 'reply' && (
                <ButtonSpan onClick={() => onReply?.()}>
                    <ReplyIcon color="primary" style={{ margin: '-5px 0px' }} />{' '}
                    <span>Reply</span>
                </ButtonSpan>
            )}
            {type === 'delete' && (
                <ButtonSpan
                    onClick={() => deleteComment(comment?.id, postId, userId)}
                >
                    <DeleteOutlineOutlinedIcon
                        style={{ margin: '-5px 0px' }}
                        color="primary"
                    />{' '}
                    <span>Delete</span>
                </ButtonSpan>
            )}
            {type === 'edit' && (
                <ButtonSpan onClick={() => setEditComment?.(true)}>
                    <EditIcon style={{ margin: '-5px 0px' }} color="primary" />{' '}
                    <span>Edit</span>
                </ButtonSpan>
            )}
            {type === 'cancel' && (
                <ButtonSpan onClick={() => setEditComment?.(false)}>
                    <ClearIcon style={{ margin: '-7px 0px' }} color="primary" />{' '}
                    <span>Cancel</span>
                </ButtonSpan>
            )}
            {type === 'update' && (
                <ButtonSpan onClick={() => update?.(comment)}>
                    <AddCircleOutlineIcon
                        style={{ margin: '-7px 0px' }}
                        color="primary"
                    />{' '}
                    <span>Update</span>
                </ButtonSpan>
            )}
            {type === 'deleteReply' && (
                <Typography
                    style={{ display: 'inline-block', float: 'right' }}
                    align="right"
                >
                    <ButtonSpan
                        onClick={() =>
                            deleteReply?.(
                                replyId,
                                postId,
                                replyUserId,
                                comment?.id
                            )
                        }
                    >
                        <DeleteOutlineOutlinedIcon
                            style={{ margin: '-5px 0px' }}
                            color="primary"
                        />{' '}
                        <span>Delete</span>
                    </ButtonSpan>
                </Typography>
            )}
        </>
    )
}

export default ButtonFunction
