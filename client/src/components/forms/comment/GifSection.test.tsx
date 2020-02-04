import React from "react";
import { shallow, mount, render } from "enzyme";
import GifSection from "./GifSection";

describe("<GifSection/>", () => {
    it("renders the <GifSection/>", () => {
        const wrapper = shallow(<GifSection />);
        expect(wrapper.exists()).toBe(true);
    });
});
