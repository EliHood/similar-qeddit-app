import React from "react";
import { createShallow, createMount } from "@material-ui/core/test-utils";
import toJson from "enzyme-to-json";
import PostForm from "./createPost";
import Post from "../../post/post";

const props = {
    title: "Test",
    postContent: "",
    handleTitleChange: jest.fn(),
    handleContentChange: jest.fn(),
    onSubmit: jest.fn(),
    disButton: false,
    titleError: "",
    bodyError: "",
};
describe("<PostForm/>", () => {
    let mount;
    let wrapper;
    beforeEach(() => {
        mount = createMount();
        wrapper = mount(<PostForm {...props} />);
    });

    it("should render <PostForm/> component", () => {
        expect(wrapper.find("form")).toHaveLength(1);
    });

    it("should test title props", () => {
        // console.log(wrapper.find(TextField).debug());
        const title = "Test";
        expect(wrapper.props().title).toBe(title);
    });

    it("should test title onChange", () => {
        // console.log(wrapper.find(TextField).debug());
        const title = "Test";
        wrapper.props().handleTitleChange({
            target: {
                value: title,
            },
        });
        expect(props.handleTitleChange).toHaveBeenCalled();
    });
});
