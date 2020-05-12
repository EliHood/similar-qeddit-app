import React, { Fragment } from "react";
import PostForm from "../forms/createPost/createPost";
import GridHoc from "../hoc/grid";
import OurTabs from "../tabs/OurTabs";
import { InputHook } from "../common/handleHook";
import usePostsHook from "./../common/postsHook";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { createPostInit, addTitle, addContent } from "../../actions/postActions";
import { getBodyError, getTitleError, postContent, title } from "../../selectors/selectors";

function Dashboard(props: any) {
    // this hook
    usePostsHook();
    const inputData = {
        addTitle: (data: string) => dispatch(addTitle(data)),
        addContent: (data: string) => dispatch(addContent(data)),
    };
    const { handleInputChange } = InputHook(inputData);
    const dispatch = useDispatch();
    const createPost = (postData: object) => dispatch(createPostInit(postData));
    const ourTitle = useSelector(title());
    const titleError = useSelector(getTitleError());
    const ourBodyError = useSelector(getBodyError());
    const ourPostContent = useSelector(postContent());

    const onSubmit = (e: any) => {
        e.preventDefault();
        const postData = { ourTitle, ourPostContent };
        createPost(postData);
    };
    const isEnabled = titleError === true && ourBodyError === true ? false : true;
    console.log("fffgg", props);
    return (
        <Fragment>
            <Grid justify="center" container={true}>
                <Grid item={true} lg={9} xs={11}>
                    <PostForm
                        title={ourTitle}
                        postContent={ourPostContent}
                        handleTitleChange={handleInputChange}
                        handleContentChange={handleInputChange}
                        onSubmit={onSubmit}
                        disButton={isEnabled}
                        titleError={titleError}
                        bodyError={ourBodyError}
                    />
                </Grid>
            </Grid>

            <br />

            <OurTabs />
        </Fragment>
    );
}

export default GridHoc(Dashboard);
// will be useful for unit testing.
export { Dashboard as DashboardComponent };
