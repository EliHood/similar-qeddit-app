import React from "react";
import OurSecondaryButton from "./OurSecondaryButton";
import { shallow, mount } from "enzyme";
import Button from "@material-ui/core/Button";
describe("Should render <OurSecondaryButton/>", () => {
    it("Should render the button", () => {
        const container = mount(<OurSecondaryButton>Owl</OurSecondaryButton>);
        expect(container.find(Button).at(0)).toHaveLength(1);
    });
});
