import "@testing-library/jest-dom";
import React, { Ref } from "react";
import CommentList from "./CommentList";
import { render, getByText, queryByText, getAllByTestId, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { cleanup } from "@testing-library/react";

const props = {
    user: {},
    postId: null,
    userId: null,
    currentUser: {},
    ref: {
        current: undefined,
    },
    comments: [
        {
            author: { username: "barnowl", gravatar: "https://api.adorable.io/avatars/400/bf1eed82fbe37add91cb4192e4d14de6.png", bio: null },
            comment_body: "fsfsfsfsfs",
            createdAt: "2020-05-27T14:32:01.682Z",
            gifUrl: "",
            id: 520,
            postId: 28,
            updatedAt: "2020-05-27T14:32:01.682Z",
            userId: 9,
        },
        {
            author: { username: "barnowl", gravatar: "https://api.adorable.io/avatars/400/bf1eed82fbe37add91cb4192e4d14de6.png", bio: null },
            comment_body: "fsfsfsfsfs",
            createdAt: "2020-05-27T14:32:01.682Z",
            gifUrl: "",
            id: 519,
            postId: 27,
            updatedAt: "2020-05-27T14:32:01.682Z",
            userId: 10,
        },
        {
            author: { username: "barnowl2", gravatar: "https://api.adorable.io/avatars/400/bf1eed82fbe37add91cb4192e4d14de6.png", bio: null },
            comment_body: "fsfsfsfsfs",
            createdAt: "2020-05-27T14:32:01.682Z",
            gifUrl: "",
            id: 518,
            postId: 28,
            updatedAt: "2020-05-27T14:32:01.682Z",
            userId: 11,
        },
    ],
    deleteComment: jest.fn(),
};

describe("Should render <CommentList/>", () => {
    afterEach(cleanup);
    // your test

    it("should render <CommentList/>", () => {
        const commentList = render(<CommentList {...props} />);
        expect(commentList).toBeTruthy();
    });

    it("should render first comment", () => {
        const { getByTestId } = render(<CommentList {...props} />);
        const commentList = getByTestId("comment-list-div");
        expect(commentList.firstChild).toBeTruthy();
    });

    it("should render second child", () => {
        const { getByTestId } = render(<CommentList {...props} />);
        const commentList = getByTestId("comment-list-div");
        expect(commentList.lastChild).toBeTruthy();
    });

    it("should check comments", () => {
        const rtl = render(<CommentList {...props} />);

        expect(rtl.getByTestId("comment-list-div")).toBeTruthy();
        expect(rtl.getByTestId("comment-list-div")).toBeTruthy();

        expect(rtl.getByTestId("comment-list-div").querySelectorAll(".comment").length).toEqual(2);
    });
    it("should match snapshot", () => {
        const rtl = render(<CommentList {...props} />);
        expect(rtl).toMatchSnapshot();
    });

    it("should check more comments", () => {
        const { queryByTestId } = render(<CommentList {...props} />);
        const commentList = queryByTestId("comment-show-more");
        expect(commentList).toBeNull();
    });

    it("should fire show more action", () => {
        const { getByTestId, getAllByTestId } = render(<CommentList {...props} />);
        const showMore = getByTestId("show_more_button");
        fireEvent.click(showMore);
        expect(getAllByTestId(/comment-show-more/i).length).toEqual(3);
    });
});
