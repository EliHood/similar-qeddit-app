import React, { useEffect } from "react";
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

    beforeEach(() => {
        useEffect = jest.spyOn(Likes.prototype, "componentDidMount");
        wrapper = shallow(<Likes {...props} />);
    });

    it("Should render <Likes/>", () => {
        expect(wrapper.find(PostList).at(0)).toHaveLength(1);
    });
    it("Should execute getPostsInit", () => {
        expect(useEffect).toHaveBeenCalled();
        expect(props.getPostsInit).toHaveBeenCalled();
    });
});
