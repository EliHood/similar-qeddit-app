import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React from "react";

const CommentForm = (props) => (
  <div>
    <form onSubmit={props.onSubmit}>
      <TextField
        type="text"
        style={{ borderRadius: "50%" }}
        id="outlined-multiline-static"
        label="Write A Comment"
        multiline={true}
        name="comment_body"
        value={props.commentBody}
        rows="3"
        fullWidth={true}
        margin="normal"
        variant="outlined"
        onChange={props.commentChange}
      />
      <br />
      <br />
      <Button type="submit" variant="outlined" color="primary">
        Post A Comment
     </Button>
    </form>
  </div>
);
export default CommentForm;
