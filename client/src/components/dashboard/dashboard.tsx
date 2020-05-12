import React, { Fragment } from "react";
import PostForm from "../forms/createPost/createPost";
import GridHoc from "../hoc/grid";
import OurTabs from "../tabs/OurTabs";
import { InputHook } from "../common/handleHook";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { addTitle, addContent } from "../../actions/postActions";

import storeMethods from "./../common/storeHooks";
function Dashboard(props: any) {
    const dispatch = useDispatch();
    const inputData = {
        addTitle: (data: string) => dispatch(addTitle(data)),
        addContent: (data: string) => dispatch(addContent(data)),
    };
    const { handleInputChange } = InputHook(inputData);
    const ourTitle = storeMethods().ourTitle;
    const titleError = storeMethods().titleError;
    const ourBodyError = storeMethods().ourBodyError;
    const ourPostContent = storeMethods().ourPostContent;
    const { createPost } = storeMethods();
    const onSubmit = (e: any) => {
        e.preventDefault();
        const postData = { ourTitle, ourPostContent };
        console.log(postData);
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
