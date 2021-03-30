import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import GifIcon from '@material-ui/icons/Gif';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import storeHooks from './storeHooks';

type FieldType = {
  type: 'gif-commentfield' | 'post' | 'comment' | 'post-content' | 'edit-comment';
  handleTitleChange?: (e: any) => void;
  title?: string;
  titleError?: boolean | null;
  comment_body?: string;
  commentChange?: (e: any) => void;
  post_content?: string;
  bodyError?: boolean | null;
  handleContentChange?: (e: any) => void;
  setGifSelected?: () => void;
  selectedUser?: string;
  setCommentEdit?: (e: any) => void;
};

const OurTextField: React.FC<FieldType> = (props) => {
  const { selectedUser } = storeHooks();

  return (
    <>
      {props.type === 'post' && (
        <TextField
          label="Title"
          style={{
            width: '100%',
          }}
          name="title"
          error={!(props.titleError === true || props.titleError === null)}
          // helperText={props.titleError}
          value={props.title!}
          onChange={props?.handleTitleChange}
          margin="none"
        />
      )}

      {props.type === 'gif-commentfield' && (
        <TextField
          className="commentInput"
          type="text"
          style={{ borderRadius: '50%' }}
          id="outlined-multiline-static"
          label="Write A Comment"
          multiline
          size="medium"
          name="comment_body"
          value={props.comment_body}
          rows={props.comment_body!.length > 35 ? 3 : 1}
          error={props.comment_body!.length > 200}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment style={{ cursor: 'pointer', alignItems: 'center' }} position="start">
                <GifIcon onClick={props?.setGifSelected} />
              </InputAdornment>
            ),
          }}
          margin="normal"
          variant="outlined"
          onChange={props?.commentChange}
        />
      )}
      {props.type === 'post-content' && (
        <TextField
          id="outlined-multiline-static"
          label="Post Content"
          name="postContent"
          multiline
          style={{
            width: '100%',
            paddingTop: '20px',
          }}
          rows={props.post_content!.length > 50 ? '4' : '1'}
          error={!(props.bodyError! === true || props.bodyError === null)}
          value={props.post_content!}
          onChange={props?.handleContentChange}
          margin="normal"
        />
      )}
      {props.type === 'edit-comment' && (
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
          defaultValue={props.comment_body}
          rows="2"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={props?.setCommentEdit}
        />
      )}
    </>
  );
};

export default OurTextField;
