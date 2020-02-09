import React from "react";
import { DashboardComponent as Dashboard } from "./dashboard";
import { shallow, mount, render } from "enzyme";
import PostForm from "../../components/forms/createPost/createPost";
describe("<Dashboard/>", () => {
    let wrapper;

    const props = {
        getPostsInit: jest.fn(),
        getPopPostsInit: jest.fn(),
        deletePostInit: jest.fn(),
        postCommentInit: jest.fn(),
        titleError: Boolean,
        bodyError: Boolean,
        posts: [],
        error: [],
        title: "",
        postContent: "",
        addTitle: jest.fn(),
        addContent: jest.fn(),
        popPosts: [],
        createPostInit: jest.fn(),
        likePost: jest.fn(),
        dislikePost: jest.fn(),
        initCommentUpdates: jest.fn(),
    };
    beforeEach(() => {
        wrapper = shallow(<Dashboard {...props} />);
    });

    it("Should render dashboard component", () => {
        expect(wrapper).toHaveLength(1);
    });

    it("should render <PostForm/> child component ", () => {
        expect(wrapper.find(PostForm)).toHaveLength(1);
    });
});
