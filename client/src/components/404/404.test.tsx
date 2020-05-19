import React, { Fragment } from "react";
import NotFound from "./404";
import { shallow, mount, render } from "enzyme";

describe("Should render 404Page", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<NotFound />);
    });

    it("should render 404 page", () => {
        expect(wrapper).toHaveLength(1);
    });
    it("should render 404 page", () => {
        expect(wrapper.find("h4").text()).toContain("No Page Found :(");
    });
    it("should have img", () => {
        expect(wrapper.find("img")).toHaveLength(1);
    });
});
