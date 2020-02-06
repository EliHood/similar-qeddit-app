import React from "react";
import { shallow, mount, render } from "enzyme";
import CommentForm from "./CommentForm";
import TextField from "@material-ui/core/TextField";
import { createMount } from "@material-ui/core/test-utils";
const props = {
    comment_body: "Test",
    gifUrl: jest.fn(),
    commentChange: jest.fn(),
    isGif: "",
    onSubmit: jest.fn(),
};

describe("<CommentForm/>", () => {
    let wrapper;
    let mount;
    beforeEach(() => {
        mount = createMount();
        wrapper = mount(<CommentForm {...props} />);
    });

    it("renders the <CommentForm/>", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("should test comment_body value", () => {
        // console.log(wrapper.find(TextField).debug());
        const comment_body = "Test";
        expect(wrapper.find(TextField).props().value).toBe(comment_body);
    });

    // when using mount call  .props.onChange instead of simulate(which for shallow )
    it("should test comment_body onChange", () => {
        // console.log(wrapper.find(TextField).debug());
        const comment_body = "Test";
        wrapper
            .find(TextField)
            .props()
            .onChange({
                target: {
                    value: comment_body,
                },
            });
        expect(props.commentChange).toHaveBeenCalled();
    });

    // describe("<CommentForm/> should test onChange", () => {
    //     const value = "Test";
    //     beforeEach(() => {
    //         let input = wrapper.find("TextField");
    //         console.log(input);

    //         input.simulate("change", {
    //             target: { name: "comment_body", value: value },
    //         });
    //     });

    //     it("comment body changes to value", () => {
    //         const inputValue = wrapper.find(".commentInput");
    //         expect(inputValue.props().comment_body).toBe(value);
    //     });
    // });
});
