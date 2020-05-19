import React from "react";
import OurLoader from "./OurLoader";
import { shallow, mount, render } from "enzyme";

describe("Should render loader", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<OurLoader />);
    });
    it("should render loader", () => {
        expect(wrapper).toHaveLength(1);
    });
});
