import React, { useEffect } from 'react';
import { shallow, mount, render } from 'enzyme';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import { Provider } from 'react-redux';
import PostList from '../forms/postList/postList';
import { LikesComponent as Likes } from './Likes';
import { store } from '@mfe/redux-store';

describe('<Likes/>', () => {
    let wrapper;
    let mount;
    const props = {
        posts: [],
        likePost: jest.fn(),
        deletePostInit: jest.fn(),
    };
    beforeEach(() => {
        mount = createMount();
        wrapper = mount(
            <Provider store={store}>
                <Likes {...props} />
            </Provider>,
        );
    });
    it('Should render <Likes/>', () => {
        expect(wrapper.find(PostList).at(0)).toHaveLength(1);
    });

    it('Should test likePost', () => {
        const { likePost } = wrapper
            .find(PostList)
            .at(0)
            .props();
        expect(likePost).toEqual(props.likePost);
    });

    it('Should test delete Post', () => {
        const { deletePost } = wrapper
            .find(PostList)
            .at(0)
            .props();
        expect(deletePost).toEqual(props.deletePostInit);
    });

    it('Should test posts', () => {
        const { posts } = wrapper
            .find(PostList)
            .at(0)
            .props();
        expect(posts).toEqual(props.posts);
    });
});
