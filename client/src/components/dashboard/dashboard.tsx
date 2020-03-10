import React, { useRef, Fragment } from "react";
import PostForm from "../forms/createPost/createPost";
import GridHoc from "../hoc/grid";
import OurTabs from "../tabs/OurTabs";
import { InputHook } from "../common/handleHook";
export interface dashboardProps {
    getPostsInit: () => void;
    getPopPostsInit: () => void;
    deletePostInit: (id: number) => void;
    postCommentInit: (event: object) => void;
    titleError?: boolean;
    bodyError?: boolean;
    posts: any[];
    error: any[];
    title: string;
    postContent: string;
    addTitle: (data: string) => void;
    addContent: (data: string) => void;
    popPosts: any[];
    createPostInit: (event: object) => void;
    likePost: (event: number) => void;
    dislikePost: (event: number) => void;
    initCommentUpdates: () => void;
}

function Dashboard(props: dashboardProps) {
    // const [title, setTitle] = useState<string>("");
    // const [content, setContent] = useState<string>("");
    // const [value, setValue] = useState<number>(0);
    const didMountRef = useRef<Object>();
    const { handleInputChange } = InputHook(props);
    React.useEffect(() => {
        if (!didMountRef.current) {
            props.getPostsInit();
            props.initCommentUpdates();
            console.log("test");
        } else {
            console.log("this is component didupdate");
        }
    }, []); // array prevents an infinite loop

    // const handleTitleChange = (e: any) => {
    //     e.preventDefault();
    //     console.log(e.target.name);
    //     props.addTitle(e.target.value);
    // };

    // const handleContentChange = (e: any) => {
    //     e.preventDefault();
    //     props.addContent(e.target.value);
    // };
    const onSubmit = (e: any) => {
        e.preventDefault();
        const { title, postContent } = props;
        const postData = { title, postContent };
        console.log(postData);
        props.createPostInit(postData);
    };
    const isEnabled = props.titleError === true && props.bodyError === true ? false : true;

    return (
        <Fragment>
            <PostForm
                title={props.title}
                postContent={props.postContent}
                handleTitleChange={handleInputChange}
                handleContentChange={handleInputChange}
                onSubmit={onSubmit}
                disButton={isEnabled}
                titleError={props.titleError}
                bodyError={props.bodyError}
            />
            <br />
            {/* pass props redux props to tabs */}
            <OurTabs {...props} />
        </Fragment>
    );
}

export default GridHoc(Dashboard);
// will be useful for unit testing.
export { Dashboard as DashboardComponent };
