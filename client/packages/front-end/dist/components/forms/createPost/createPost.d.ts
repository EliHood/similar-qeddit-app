declare type PostFormInterface = {
    onSubmit: (event: any) => void;
    title: string;
    titleError: boolean;
    bodyError: boolean;
    handleTitleChange: (event: any) => void;
    postContent: string;
    handleContentChange: (event: any) => void;
    disButton: boolean;
};
declare const PostForm: ({ onSubmit, handleTitleChange, titleError, bodyError, title, handleContentChange, postContent, disButton, }: PostFormInterface) => JSX.Element;
export default PostForm;
