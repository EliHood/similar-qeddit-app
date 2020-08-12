import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import OurTextField from "../../../common/OurTextField";

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
        <OurTextField type="post" titleError={props.titleError} title={props.title} handleTitleChange={props.handleTitleChange} />
        <FormHelperText error={true} id="component-helper-text">
            {props.titleError}
        </FormHelperText>

        <OurTextField type="post-content" bodyError={props.bodyError} post_content={props.postContent} handleContentChange={props.handleContentChange} />
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
