import usePostsHook from "./postsHook";
import useNotificationHook from "./notificationHook";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../actions/userActions";
import {
    likePostInit,
    dislikePostInit,
    deletePostInit,
    repostPostInit,
    unrepostPostInit,
    commentReplyInit,
    setSelectedUser,
    searchPostsInit,
    deleteReplyInit,
    createPostInit,
    addTitle,
    setMentionedUser,
    addContent,
    deleteCommentInit,
    editCommentInit,
    postCommentInit,
    getSearchInit,
} from "../actions/postActions";
import {
    getIsNotified,
    searchQuery,
    getUser,
    getPosts,
    getPopPosts,
    isLoading,
    postError,
    userError,
    getBodyError,
    getSelectedUser,
    mentionUser,
    userMessage,
    getTitleError,
    postContent,
    searchPageResults,
    getProfileData,
    results,
    title,
    fetchRelatedUsers,
} from "../selectors/selectors";
function useStoreMethods() {
    const dispatch = useDispatch();
    const [notifications] = useNotificationHook();
    const isNotified = useSelector(getIsNotified);
    const user = useSelector(getUser);
    const likePost = (id: number) => dispatch(likePostInit(id));
    const dislikePost = (id: number) => dispatch(dislikePostInit(id));
    const deletePost = (id: number, userId: number) => dispatch(deletePostInit(id, userId));
    const deleteComment = (id: number, postId: number, userId: number) => dispatch(deleteCommentInit(id, postId, userId));
    const postComment = (commentData: object) => dispatch(postCommentInit(commentData));
    const editComment = (commentData) => dispatch(editCommentInit(commentData));
    const createPost = (postData: object) => dispatch(createPostInit(postData));
    const rePost = (id: number, userId: number) => dispatch(repostPostInit(id, userId));
    const unRepost = (id: number, userId: number) => dispatch(unrepostPostInit(id, userId));
    const getProfile = () => dispatch(getUserProfile());
    const updateProfile = (userData) => dispatch(updateUserProfile(userData));
    const replyComm = (data: object) => dispatch(commentReplyInit(data));
    const deleteRep = (data: object) => dispatch(deleteReplyInit(data));
    const searchQ = (query: string) => dispatch(searchPostsInit(query));
    const getSearch = (query: string) => dispatch(getSearchInit(query));
    const setSelectedOptionValue = (optionValue: string) => dispatch(setSelectedUser(optionValue));
    const setMentioned = () => dispatch(setMentionedUser());
    const ourTitle = useSelector(title);
    const titleError = useSelector(getTitleError);
    const ourBodyError = useSelector(getBodyError);
    const ourPostContent = useSelector(postContent);
    const profileData = useSelector(getProfileData);
    const popPosts = useSelector(getPopPosts);
    const posts = useSelector(getPosts);
    const userErr = useSelector(userError);
    const message = useSelector(userMessage);
    const errPost = useSelector(postError);
    const loading = useSelector(isLoading);
    const query = useSelector(searchQuery);
    const postResults = useSelector(results);
    const searchResults = useSelector(searchPageResults);
    const mentionUsers = useSelector(fetchRelatedUsers);
    const selectedUser = useSelector(getSelectedUser);
    const mentionedUser = useSelector(mentionUser);
    return {
        posts,
        notifications,
        user,
        mentionUsers,
        setSelectedOptionValue,
        setMentioned,
        mentionedUser,
        loading,
        errPost,
        message,
        userErr,
        query,
        selectedUser,
        searchResults,
        isNotified,
        getProfile,
        setSelectedUser,
        getSearch,
        postResults,
        searchQ,
        deleteRep,
        profileData,
        updateProfile,
        replyComm,
        likePost,
        dislikePost,
        deletePost,
        deleteComment,
        postComment,
        editComment,
        createPost,
        rePost,
        unRepost,
        ourTitle,
        titleError,
        popPosts,
        ourBodyError,
        ourPostContent,
    };
}

export default useStoreMethods;
