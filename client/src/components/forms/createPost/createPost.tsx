import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";

interface PostFormInterface {
    onSubmit: (event) => void;
    title: string;
    titleError: boolean;
    bodyError: boolean;
    handleTitleChange: (event) => void;
    postContent: string;
    handleContentChange: (event) => void;
    disButton: boolean;
}
const PostForm = (props: PostFormInterface) => (
    <form onSubmit={props.onSubmit}>
        <Typography className="title" style={{ paddingBottom: "20px" }} variant="subtitle1">
            New Post
        </Typography>
        <TextField
            label="Title"
            style={{
                width: "100%",
            }}
            name="title"
            error={props.titleError === true || props.titleError === null ? false : true}
            // helperText={props.titleError}
            value={props.title}
            onChange={props.handleTitleChange}
            margin="none"
        />
        <FormHelperText error={true} id="component-helper-text">
            {props.titleError}
        </FormHelperText>

        <TextField
            id="outlined-multiline-static"
            label="Post Content"
            name="postContent"
            multiline={true}
            style={{
                width: "100%",
                paddingTop: "20px",
            }}
            rows={props.postContent.length > 50 ? "4" : "1"}
            error={props.bodyError === true || props.bodyError === null ? false : true}
            value={props.postContent}
            onChange={props.handleContentChange}
            margin="normal"
        />
        <FormHelperText error={true} id="component-helper-text">
            {props.bodyError}
        </FormHelperText>
        <br />
        <Button className="butSub" disabled={props.disButton} variant="outlined" color="primary" type="submit">
            Submit
        </Button>
    </form>
);

export default PostForm;
