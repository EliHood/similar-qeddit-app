declare function useStoreMethods(): {
    posts: any;
    notifications: any;
    user: any;
    mentionUsers: any;
    setSelectedOptionValue: (optionValue: string) => {
        type: string;
        payload: string;
    };
    setMentioned: () => {
        type: string;
    };
    commenterId: any;
    mentionedUser: any;
    loading: any;
    errPost: any;
    message: any;
    userErr: any;
    query: any;
    selectedUser: any;
    searchResults: any;
    isNotified: any;
    getProfile: () => {
        type: string;
    };
    setSelectedUser: () => (payload: string) => {
        type: string;
        payload: string;
    };
    getSearch: (query: string) => {
        type: string;
        payload: string;
    };
    postResults: any;
    searchQ: (query: string) => {
        type: string;
        payload: string;
    };
    deleteRep: (data: object) => {
        type: string;
        payload: object;
    };
    profileData: any;
    updateProfile: (userData: any) => {
        type: string;
        payload: object;
    };
    replyComm: (data: object) => {
        type: string;
        payload: object;
    };
    likePost: (id: number) => {
        type: string;
        payload: number;
    };
    dislikePost: (id: number) => {
        type: string;
        payload: number;
    };
    deletePost: (id: number, userId: number) => {
        type: string;
        payload: number;
        userId: number;
    };
    deleteComment: (id: number, postId: number, userId: number) => {
        type: string;
        payload: number;
        postId: number;
        userId: number;
    };
    postComment: (commentData: object) => {
        type: string;
        payload: object;
    };
    editComment: (commentData: object) => {
        type: string;
        payload: any;
    };
    createPost: (postData: object) => {
        type: string;
        payload: object;
    };
    rePost: (id: number, userId: number) => {
        type: string;
        payload: number;
        id: number;
    };
    unRepost: (id: number, userId: number) => {
        type: string;
        payload: number;
        id: number;
    };
    ourTitle: any;
    titleError: any;
    popPosts: any;
    ourBodyError: any;
    ourPostContent: any;
};
export default useStoreMethods;
