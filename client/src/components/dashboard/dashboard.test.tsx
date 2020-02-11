import React from "react";
import { DashboardComponent as Dashboard } from "./dashboard";
import { shallow, mount, render } from "enzyme";
import PostForm from "../../components/forms/createPost/createPost";
describe("<Dashboard/>", () => {
    let wrapper;
    let useEffect;
    const mockUseEffect = () => {
        useEffect.mockImplementationOnce((f) => f());
    };
    const props = {
        getPostsInit: jest.fn(),
        getPopPostsInit: jest.fn(),
        deletePostInit: jest.fn(),
        postCommentInit: jest.fn(),
        titleError: Boolean,
        bodyError: Boolean,
        posts: [],
        error: [],
        title: "Test",
        postContent: "Another test",
        addTitle: jest.fn(),
        addContent: jest.fn(),
        popPosts: [],
        createPostInit: jest.fn(),
        likePost: jest.fn(),
        dislikePost: jest.fn(),
        initCommentUpdates: jest.fn(),
    };
    beforeEach(() => {
        useEffect = jest.spyOn(React, "useEffect");
        mockUseEffect();
        wrapper = shallow(<Dashboard {...props} />);
    });

    it("Should render dashboard component", () => {
        expect(wrapper).toHaveLength(1);
    });

    it("Should execute getPostsInit", () => {
        expect(props.getPostsInit).toHaveBeenCalled();
    });

    it("Should test handleTitleChange", () => {
        wrapper
            .find(PostForm)
            .props()
            .handleTitleChange({
                preventDefault() {},
                target: {
                    value: props.title,
                },
            });
        expect(props.addTitle).toHaveBeenCalled();
    });

    it("Should test handleContentChange", () => {
        wrapper
            .find(PostForm)
            .props()
            .handleContentChange({
                preventDefault() {},
                target: {
                    value: props.postContent,
                },
            });
        expect(props.addContent).toHaveBeenCalled();
    });

    it("Should test onSubmit function", () => {
        wrapper
            .find(PostForm)
            .props()
            .onSubmit({
                preventDefault() {},
            });
        expect(props.createPostInit).toHaveBeenCalled();
    });

    it("should render <PostForm/> child component ", () => {
        expect(wrapper.find(PostForm)).toHaveLength(1);
    });
});
