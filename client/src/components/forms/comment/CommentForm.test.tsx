import React from "react";
import { shallow, mount, render } from "enzyme";
import CommentForm from "./CommentForm";

const props = {
    comment_body: "Test",
    gifUrl: jest.fn(),
    commentChange: jest.fn(),
    isGif: "",
    onSubmit: jest.fn(),
};

describe("<CommentForm/>", () => {
    it("renders the <CommentForm/>", () => {
        const wrapper = shallow(<CommentForm {...props} />);
        expect(wrapper.exists()).toBe(true);
    });

    it("should test comment_body props", () => {
        const wrapper = mount(<CommentForm {...props} />);
        expect(wrapper.props().comment_body).toContain("Test");
    });
});
