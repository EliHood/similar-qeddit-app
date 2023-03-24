import { useDispatch, useSelector } from 'react-redux'
import { postActions, selectors, userActions } from '@mfe/redux-store/src'
import useNotificationHook from '../useNotificationHook/useNotificationHook'

function useStoreMethods() {
    const dispatch = useDispatch()
    const [notifications] = useNotificationHook()
    const isNotified = useSelector(selectors.getIsNotified)
    const user = useSelector(selectors.getUser)
    const likePost = (id: number) => dispatch(postActions.likePostInit(id))
    const dislikePost = (id: number) =>
        dispatch(postActions.dislikePostInit(id))
    const deletePost = (id: number, userId: number) =>
        dispatch(postActions.deletePostInit(id, userId))
    const deleteComment = (id: number, postId: number, userId: number) =>
        dispatch(postActions.deleteCommentInit(id, postId, userId))
    const postComment = (commentData: object) =>
        dispatch(postActions.postCommentInit(commentData))
    const editComment = (commentData: object) =>
        dispatch(postActions.editCommentInit(commentData))
    const createPost = (postData: object) =>
        dispatch(postActions.createPostInit(postData))
    const rePost = (id: number, userId: number) =>
        dispatch(postActions.repostPostInit(id, userId))
    const unRepost = (id: number, userId: number) =>
        dispatch(postActions.unrepostPostInit(id, userId))
    const getProfile = () => dispatch(userActions.getUserProfile())
    const updateProfile = (userData: any) =>
        dispatch(userActions.updateUserProfile(userData))
    const replyComm = (data: object) =>
        dispatch(postActions.commentReplyInit(data))
    const deleteRep = (data: object) =>
        dispatch(postActions.deleteReplyInit(data))
    const searchQ = (query: string) =>
        dispatch(postActions.searchPostsInit(query))
    const getSearch = (query: string) =>
        dispatch(postActions.getSearchInit(query))
    const setSelectedOptionValue = (optionValue: string) =>
        dispatch(postActions.setSelectedUser(optionValue))
    const setMentioned = () => dispatch(postActions.setMentionedUser())
    const setSelectedUser = () => dispatch(postActions.setSelectedUser)
    const ourTitle = useSelector(selectors.title)
    const titleError = useSelector(selectors.getTitleError)
    const ourBodyError = useSelector(selectors.getBodyError)
    const ourPostContent = useSelector(selectors.postContent)
    const profileData = useSelector(selectors.getProfileData)
    const popPosts = useSelector(selectors.getPopPosts)
    const posts = useSelector(selectors.getPosts)
    const userErr = useSelector(selectors.userError)
    const message = useSelector(selectors.userMessage)
    const errPost = useSelector(selectors.postError)
    const loading = useSelector(selectors.isLoading)
    const query = useSelector(selectors.searchQuery)
    const postResults = useSelector(selectors.results)
    const searchResults = useSelector(selectors.searchPageResults)
    const mentionUsers = useSelector(selectors.fetchRelatedUsers)
    const selectedUser = useSelector(selectors.getSelectedUser)
    const mentionedUser = useSelector(selectors.mentionUser)
    const commenterId = useSelector(selectors.getCommenterId)
    const isAuthenticated = useSelector(selectors.isAuthenticated)
    const isGoogleAccount = useSelector(selectors.isGoogleAccount)
    return {
        posts,
        notifications,
        user,
        isAuthenticated,
        isGoogleAccount,
        mentionUsers,
        setSelectedOptionValue,
        setMentioned,
        commenterId,
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
    }
}

export default useStoreMethods
