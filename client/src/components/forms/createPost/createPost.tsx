import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
const PostForm = (props: any) => (
  <form onSubmit={props.onSubmit}>
    <Typography variant="h4">New Post</Typography>
    <TextField
      id="outlined-name"
      label="Title"
      style={{
        width: 560,
      }}
      name="title"
      value={props.title}
      onChange={props.handleChange}
      margin="normal"
      variant="outlined"
    />
    <br/>
    <TextField
      id="outlined-multiline-static"
      label="Post Content"
      name="postContent"
      multiline={true}
      style={{
        width: 560,
      }}
      rows="4"
      value={props.postContent}
      onChange={props.handleChange}
      margin="normal"
      variant="outlined"
    />
    <br/>
    <br/>
    <Button variant="outlined" color="primary" type="submit">
      Submit
    </Button>
  </form>
);

export default PostForm;
