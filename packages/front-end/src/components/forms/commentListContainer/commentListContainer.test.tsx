import '@testing-library/jest-dom';
import React, { Ref } from 'react';
import {
    render, getByText, queryByText, getAllByTestId,
} from '@testing-library/react';
import CommentListContainer from './commentListContainer';

const props = {
    ref: {
        current: undefined,
    },
    user: {},
    comment: {
        author: { username: 'barnowl', gravatar: 'https://api.adorable.io/avatars/400/bf1eed82fbe37add91cb4192e4d14de6.png', bio: null },
        comment_body: 'fsfsfsfsfs',
        createdAt: '2020-05-27T14:32:01.682Z',
        gifUrl: '',
        id: 520,
        postId: 28,
        updatedAt: '2020-05-27T14:32:01.682Z',
        userId: 9,
    },
    currentUser: {},
    isBold: jest.fn(),
    handleCloseModal: jest.fn(),
    handleClickOpen: jest.fn(),
};

describe('Should test <CommentListContainer', () => {
    it('should render CommentListContainer', () => {
        const commentListContainer = render(<CommentListContainer {...props} />);
        expect(commentListContainer).toBeTruthy();
    });

    it('should render CommentListContainer ', () => {
        const commentListContainer = render(<CommentListContainer {...props} />);
        expect(commentListContainer).not.toEqual(null);
    });

    it('should render comment item wrapper', () => {
        const { getByTestId } = render(<CommentListContainer {...props} />);
        expect(getByTestId('commentitem-wrapper')).toBeInTheDocument();
    });

    it('should render comment wrapper', () => {
        const { getByTestId } = render(<CommentListContainer {...props} />);
        expect(getByTestId('comment-list-container')).toBeTruthy();
    });

    it('should match snapshot', () => {
        const commentListContainer = render(<CommentListContainer {...props} />);
        expect(commentListContainer).toMatchSnapshot();
    });
});
