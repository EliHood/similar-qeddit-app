import Axios from '../ourAxios'

export default {
    user: {
        signUp: (userData: any) =>
            Axios.post('/api/v1/users/signup', userData).then(
                (res) => res.data
            ),
        autoLogin: () =>
            Axios.get('/api/v1/users/auth').then((res) => res.data),
        logOut: () => Axios.get('/api/v1/users/logout').then((res) => res.data),
        logIn: (userData: any) =>
            Axios.post('/api/v1/users/login', userData).then((res) => res.data),
        currentUser: () =>
            Axios.get('/api/v1/users/currentUser').then((res) => res.data),
        editProfile: () =>
            Axios.get('/api/v1/users/editProfile').then((res) => res.data),
        getProfile: (username: string) =>
            Axios.get(`/api/v1/users/profile/${username}`).then(
                (res) => res.data
            ),
        followUser: (username: string) =>
            Axios.post(`/api/v1/users/followUser/${username}`).then(
                (res) => res.data
            ),
        unfollowUser: (username: string) =>
            Axios.delete(`/api/v1/users/unfollowUser/${username}`).then(
                (res) => res.data
            ),
        resendConfirmation: () =>
            Axios.post('/api/v1/users/resendConfirmation').then(
                (res) => res.data
            ),
        emailConfirmation: (userId: number, token: number) =>
            Axios.get(
                `/api/v1/users/emailConfirmation/${userId}/${token}`
            ).then((res) => res.data),
        updateProfile: (userData: any) =>
            Axios.put('/api/v1/users/updateProfile', userData).then(
                (res) => res.data
            ),
        getNotifications: (id: number) =>
            Axios.get(`/api/v1/notifications/${id}`).then((res) => res.data),
        markAsRead: (id: number) =>
            Axios.post(`/api/v1/notifications/markAsRead/${id}`).then(
                (res) => res.data
            ),
    },
    post: {
        createPost: (postData: any) =>
            Axios.post('/api/v1/posts/createPost', postData).then(
                (res) => res.data
            ),
        repost: (id: number, userId: number) =>
            Axios.post(`/api/v1/posts/repost/${userId}/${id}`).then(
                (res) => res.data
            ),
        unrepost: (id: number, userId: number) =>
            Axios.delete(`/api/v1/posts/unRepost/${userId}/${id}`).then(
                (res) => res.data
            ),
        getPosts: () =>
            Axios.get('/api/v1/posts/getPosts').then((res) => res.data),
        likePost: (id: number) =>
            Axios.post(`/api/v1/posts/likePost/${id}`).then((res) => res.data),
        deletePost: (id: number, userId: number) =>
            Axios.delete(`/api/v1/posts/deletePost/${userId}/${id}`).then(
                (res) => res.data
            ),
        getPost: (id: number) =>
            Axios.get(`/api/v1/posts/post/${id}`).then((res) => res.data),
        dislikePost: (id: number) =>
            Axios.post(`/api/v1/posts/dislikePost/${id}`).then(
                (res) => res.data
            ),
        postComment: (commentData: any) =>
            Axios.post('/api/v1/posts/postComment', commentData).then(
                (res) => res.data
            ),
        deleteComment: (id: number, userId: number) =>
            Axios.delete(`/api/v1/posts/deleteComment/${userId}/${id}`).then(
                (res) => res.data
            ),
        editComment: (id: number, userId: number, commentData: any) =>
            Axios.put(
                `/api/v1/posts/editComment/${userId}/${id}`,
                commentData
            ).then((res) => res.data),
        replyComment: (postId: number, commentId: number, replyData: any) =>
            Axios.post(
                `/api/v1/posts/replyComment/${postId}/${commentId}`,
                replyData
            ).then((res) => res.data),
        deleteReply: (postId: number, commentId: number, userId: number) =>
            Axios.delete(
                `/api/v1/posts/deleteReply/${postId}/${userId}/${commentId}`
            ).then((res) => res.data),
        searchPosts: (query: string) =>
            Axios.get(`/api/v1/posts/searchq=${query}`).then((res) => res.data),
        searchPostsNull: (query: string) =>
            Axios.get(`/api/v1/posts/searchq=${query}`).then((res) => res.data),
    },
}
