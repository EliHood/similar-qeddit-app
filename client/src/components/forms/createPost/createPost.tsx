import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import OurTextField from "../../../common/OurTextField";

type PostFormInterface = {
    onSubmit: (event) => void;
    title: string;
    titleError: boolean;
    bodyError: boolean;
    handleTitleChange: (event) => void;
    postContent: string;
    handleContentChange: (event) => void;
    disButton: boolean;
}
const PostForm = ({ onSubmit, handleTitleChange, titleError, bodyError, title, handleContentChange, postContent, disButton }: PostFormInterface) => (
    <form onSubmit={onSubmit}>
        <Typography className="title" style={{ paddingBottom: "20px" }} variant="subtitle1">
            New Post
        </Typography>
        <OurTextField type="post" titleError={titleError} title={title} handleTitleChange={handleTitleChange} />
        <FormHelperText error={true} id="component-helper-text">
            {titleError}
        </FormHelperText>

        <OurTextField type="post-content" bodyError={bodyError} post_content={postContent} handleContentChange={handleContentChange} />
        <FormHelperText error={true} id="component-helper-text">
            {bodyError}
        </FormHelperText>
        <br />
        <Button className="butSub" disabled={disButton} variant="outlined" color="primary" type="submit">
            Submit
        </Button>
    </form>
);

export default PostForm;
