import React, { Fragment, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import GifIcon from '@material-ui/icons/Gif'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import storeHooks from './storeHooks'
import { FieldType } from '../utils/types'

const OurTextField: React.FC<FieldType> = ({
    type,
    commentChange,
    comment_body,
    handleTitleChange,
    handleContentChange,
    title,
    titleError,
    post_content,
    bodyError,
    setCommentEdit,
    setGifSelected,
}) => {
    const { selectedUser } = storeHooks()

    return (
        <>
            {type === 'post' && (
                <TextField
                    label="Title"
                    style={{
                        width: '100%',
                    }}
                    name="title"
                    error={!(titleError === true || titleError === null)}
                    // helperText={props.titleError}
                    value={title!}
                    onChange={handleTitleChange}
                    margin="none"
                />
            )}

            {type === 'gif-commentfield' && (
                <TextField
                    className="commentInput"
                    type="text"
                    style={{ borderRadius: '50%' }}
                    id="outlined-multiline-static"
                    label="Write A Comment"
                    multiline
                    size="medium"
                    name="comment_body"
                    value={comment_body}
                    rows={comment_body!.length > 35 ? 3 : 1}
                    error={comment_body!.length > 200}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                style={{
                                    cursor: 'pointer',
                                    alignItems: 'center',
                                }}
                                position="start"
                            >
                                <GifIcon onClick={setGifSelected} />
                            </InputAdornment>
                        ),
                    }}
                    margin="normal"
                    variant="outlined"
                    onChange={commentChange}
                />
            )}
            {type === 'post-content' && (
                <TextField
                    id="outlined-multiline-static"
                    label="Post Content"
                    name="postContent"
                    multiline
                    style={{
                        width: '100%',
                        paddingTop: '20px',
                    }}
                    rows={post_content!.length > 50 ? '4' : '1'}
                    error={!(bodyError! === true || bodyError === null)}
                    value={post_content!}
                    onChange={handleContentChange}
                    margin="normal"
                />
            )}
            {type === 'edit-comment' && (
                <TextField
                    inputProps={{
                        'data-testid': 'comment-item-textfield',
                    }}
                    className="commentInput"
                    type="text"
                    style={{ borderRadius: '50%' }}
                    id="outlined-multiline-static"
                    multiline
                    name="comment_body"
                    defaultValue={comment_body}
                    rows="2"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={setCommentEdit}
                />
            )}
        </>
    )
}

export default OurTextField
