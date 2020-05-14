import { renderHook } from "@testing-library/react-hooks";
import usePostsHook from "./postsHook";
import { initCommentUpdates, getPostsInit } from "../actions/postActions";
import { getPosts } from "../selectors/selectors";
import { useSelector, useDispatch } from "react-redux";
import * as ReactRedux from "react-redux";

describe("usePostsHook hook", () => {
    // this mock will be the dispatch function that redux returns on useDispatch()
    const mockDispatch = jest.fn();
    const mockSelector = jest.fn();
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
    it("should test postsHook", () => {
        renderHook(() => usePostsHook());
        expect(mockDispatch).toHaveBeenCalledWith(getPostsInit());
        expect(mockDispatch).toHaveBeenCalledWith(initCommentUpdates());
    });
    it("should test selector", () => {
        const posts = renderHook(() => usePostsHook());

        console.log(posts);
    });
});
