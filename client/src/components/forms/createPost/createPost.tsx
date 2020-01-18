import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormHelperText from '@material-ui/core/FormHelperText';
import React from "react";
const PostForm = (props: any) => (
  <form onSubmit={props.onSubmit}>
    <Typography style={{ paddingBottom: "20px" }} variant="h4">New Post</Typography>
    <TextField
      id="outlined-name"
      label="Title"
      style={{
        width: 560,
      }}
      name="title"
      error={props.titleError === true || props.titleError === null ? false : true}
      // helperText={props.titleError}
      value={props.title}
      onChange={props.handleTitleChange}
      margin="none"
      variant="outlined"
    />
    <FormHelperText error={true} id="component-helper-text">{props.titleError}</FormHelperText>

    <TextField
      id="outlined-multiline-static"
      label="Post Content"
      name="postContent"
      multiline={true}
      style={{
        width: 560,
      }}
      rows="4"
      error={props.bodyError === true || props.bodyError === null ? false : true}
      value={props.postContent}
      onChange={props.handleContentChange}
      margin="normal"
      variant="outlined"
    />
    <FormHelperText error={true} id="component-helper-text">{props.bodyError}</FormHelperText>
    <br />
    <Button disabled={props.disButton} variant="outlined" color="primary" type="submit">
      Submit
    </Button>
  </form>
);

export default PostForm;
