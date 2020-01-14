import { createSelector } from 'reselect';

// calling educer postInitialState, so it will have access to initialState properties
const postSelector = (state: any) => state.post

export const getPosts = () => 
    createSelector(
        postSelector, 
        state => state.posts
    )

// will sort through original posts array by highest likeCount in DESC order, showing only 2
export const getPopPosts = () =>
    createSelector(
        postSelector,
        state => state.posts.slice().filter((item) => item.likeCounts > 1).sort( (a, b) => b.likeCounts - a.likeCounts).slice(0,2)
    )