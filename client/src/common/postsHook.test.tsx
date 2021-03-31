import { renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';
import usePostsHook from './usePostHook';
import { initCommentUpdates, getPostsInit } from '../actions/postActions';

describe('usePostsHook hook', () => {
    // this mock will be the dispatch function that redux returns on useDispatch()
    const mockDispatch = jest.fn();
    beforeAll(() => {
    // tells useDispatch to return the mocked dispatch
        ReactRedux.useDispatch = jest.fn().mockImplementation(() => mockDispatch);
        // tells useSelector to return an empty array
        ReactRedux.useSelector = jest.fn().mockImplementation(() => []);
    });

    beforeEach(() => {
    // clear the mocks to refresh their calls info
        ReactRedux.useDispatch.mockClear();
        mockDispatch.mockClear();
    });
    it('should test postsHook', () => {
        const { result } = renderHook(() => usePostsHook());
        expect(result.current.posts).toEqual([]);
        expect(mockDispatch).toHaveBeenCalledWith(getPostsInit());
        expect(mockDispatch).toHaveBeenCalledWith(initCommentUpdates());
    });
});
