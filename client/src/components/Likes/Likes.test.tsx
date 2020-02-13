import React from "react";
import { LikesComponent as Likes } from "./Likes";
import { shallow, mount, render } from "enzyme";
import { createShallow, createMount } from "@material-ui/core/test-utils";
import PostList from "../forms/postList/postList";

describe("<Likes/>", () => {
    let wrapper;
    let useEffect;
    const props = {
        getPostsInit: jest.fn(),
        posts: [],
    };
    const mockUseEffect = () => {
        useEffect.mockImplementationOnce((f) => f());
    };

    beforeEach(() => {
        useEffect = jest.spyOn(React, "useEffect");
        mockUseEffect();
        wrapper = shallow(<Likes {...props} />);
    });

    it("Should render <Likes/>", () => {
        expect(wrapper.find(PostList).at(0)).toHaveLength(1);
    });
    it("Should execute getPostsInit", () => {
        expect(props.getPostsInit).toHaveBeenCalled();
    });
});
