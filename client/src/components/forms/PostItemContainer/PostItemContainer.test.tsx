import '@testing-library/jest-dom';
import React, { Ref } from 'react';
import {
    render, getByText, queryByText, getAllByTestId,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../../store';
import PostitemContainer from './PostItemContainer';

const props = {
    post: {
        Comments: {
            author: { username: 'barnowl', gravatar: 'https://api.adorable.io/avatars/400/bf1eed82fbe37add91cb4192e4d14de6.png', bio: null },
            comment_body: 'fsfsfsfsfs',
            createdAt: '2020-05-29T19:15:11.435Z',
            gifUrl: '',
            id: 547,
            postId: 29,
            updatedAt: '2020-05-29T19:15:11.435Z',
            userId: 10,
        },
        author: { username: 'barnowl', gravatar: 'https://api.adorable.io/avatars/400/bf1eed82fbe37add91cb4192e4d14de6.png', bio: null },
        createdAt: '2020-05-29T18:47:25.148Z',
        id: 29,
        likeCounts: 0,
        likedByMe: false,
        postContent: 'sfsfssfsfsf',
        title: 'I love owls ',
        updatedAt: '2020-05-29T18:47:25.148Z',
        userId: 10,
    },
    currentUser: {},
};

describe('Should test <PostItemContainer/>', () => {
    it('should render <PostItemContainer/>', () => {
        const container = render(
            <Provider store={store}>
                <Router>
                    <PostitemContainer {...props} />
                </Router>
            </Provider>,
        );
        expect(container).toBeTruthy();
    });

    it('should render post item container', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Router>
                    <PostitemContainer {...props} />
                </Router>
            </Provider>,
        );
        expect(getByTestId('post-item-container')).toBeInTheDocument();
    });

    it('should check for post contcent', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Router>
                    <PostitemContainer {...props} />
                </Router>
            </Provider>,
        );

        expect(getByTestId('post-content-testid').textContent).toBe(props.post.postContent);
    });
});
