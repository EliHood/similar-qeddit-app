import { createSelector } from "reselect";

// calling educer postInitialState, so it will have access to initialState properties
const postSelector = (state: any) => state.post;
const userSelector = (state: any) => state.user;
const postSelectorId = (state: any) => state.post;

export const userStore = createSelector(userSelector, (state) => state);
export const profile = createSelector(postSelector, (state) => state.postPage);

export const getPosts =
    // this gets all posts
    createSelector(postSelector, (state) => state.posts);

export const getUserLikedPosts = (params) => {
    return createSelector(postSelector, (state) => {
        return state.posts.filter((post) => {
            return post.Likes.find((like) => like.userId == params.userId);
        });
    });
};

export const getUserPosts = (params) => {
    return createSelector(postSelector, (state) => {
        return state.posts.filter((post) => post.userId == params.userId || post.RepostedByMe == true);
    });
};

export const getProfileData = createSelector(userSelector, (state) => state.profileData);

export const getNotification = createSelector(postSelector, (state) => state.notification);

export const getIsNotified = createSelector(postSelector, (state) => state.isNotified);
export const userConfirmation = createSelector(userSelector, (state) => state.message);
export const getGoogleAccount = createSelector(userSelector, (state) => state.googleAccount);
export const userError = createSelector(userSelector, (state) => state.error);
export const postError = createSelector(postSelector, (state) => state.error);
export const userMessage = createSelector(userSelector, (state) => state.message);

// will sort through original posts array by highest likeCount in DESC order, showing only 2
export const getPopPosts = createSelector(postSelector, (state) =>
    state.posts
        .filter((item) => item.likeCounts > 1)
        .sort((a, b) => b.likeCounts - a.likeCounts)
        .slice(0, 2),
);
export const getUser = createSelector(userSelector, (state) => state.currentUser);
export const getTitleError = createSelector(postSelector, (state) => state.titleError);
export const getBodyError = createSelector(postSelector, (state) => state.bodyError);
export const title = createSelector(postSelector, (state) => state.title);
export const postContent = createSelector(postSelector, (state) => state.postContent);
export const isLoading = createSelector(postSelector, (state) => state.isLoading);

export const getNotifications = createSelector(userSelector, (state) => state.getNotifications);

export const searchQuery = createSelector(postSelector, (state) => state.searchValue);
export const results = createSelector(postSelector, (state) => state.results);
export const searchPageResults = createSelector(postSelector, (state) => state.searchPageResults);
export const getSelectedUser = createSelector(postSelector, (state) => state.selectedUser);
export const mentionUser = createSelector(postSelector, (state) => state.mentionedUser);
export const getCommenterId = createSelector(postSelector, (state) => state.commenterId);
export const fetchRelatedUsers = createSelector(postSelector, (state) => {
    // const users = state.posts.flatMap((x) => [x.author.username].concat(x.Comments.flatMap((y) => y.commentReplies.map((z) => z.author.username).concat(y.author.username))));
    function removeDuplicatesBy(keyFn, array) {
        const mySet = new Set();

        return array.filter(function(x) {
            const key = keyFn(x),
                isNew = !mySet.has(key);

            if (isNew) mySet.add(key);

            return isNew;
        });
    }

    // Recursion
    function recursGetUsers(array) {
        if (!array) return [];

        return array.flatMap((v) => {
            return [v.author.username].concat(recursGetUsers(v.Comments)).concat(recursGetUsers(v.commentReplies));
        });
    }

    const users = recursGetUsers(state.posts);
    const newUsers = removeDuplicatesBy((x) => x, users);

    return newUsers;
});
