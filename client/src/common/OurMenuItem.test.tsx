import React from "react";
import { shallow, mount } from "enzyme";
import OurMenuItem from "./OurMenuItem";
import { MenuItem } from "@material-ui/core";

describe("should render <OurMenuItem/> component", () => {
    it("should render <OurMenuItem/>", () => {
        const container = mount(<OurMenuItem>Hi</OurMenuItem>);
        expect(container.find(MenuItem).at(0)).toHaveLength(1);
    });
});
