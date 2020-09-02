import React from "react";
import NavButton from "./NavButton";
import { shallow, mount } from "enzyme";
describe("Should render <NavButton/>", () => {
    it("should render <NavButton/>", () => {
        const container = mount(<NavButton />);
        expect(container.find('[data-testid="nav-button-test"]')).toHaveLength(1);
    });
});
