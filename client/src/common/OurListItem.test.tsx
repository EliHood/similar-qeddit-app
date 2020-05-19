import React from "react";
import OurListItem from "./OurListItem";
import { shallow, mount, render } from "enzyme";

describe("Should test <OurListItem/>", () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(<OurListItem />);
    });
    it("Should render <OurListItem/>", () => {
        expect(wrapper).toHaveLength(1);
    });
    it("Should render children", () => {
        expect(wrapper.children()).toHaveLength(1);
    });
});
