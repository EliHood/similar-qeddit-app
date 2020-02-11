import React from "react";
import { createShallow, createMount } from "@material-ui/core/test-utils";
import OurTabs from "./OurTabs";
describe("Should test <OurTabs/>", () => {
    let wrapper;
    let shallow;

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(<OurTabs />);
    });

    it("Should render OurTabs component", () => {
        expect(wrapper).toHaveLength(1);
    });

    it("Should find tabMenu", () => {
        expect(wrapper.find(".tabMenu")).toHaveLength(1);
    });

    it("Should find tabPanel", () => {
        expect(wrapper.find("TabPanel").at(0)).toHaveLength(1);
    });

    it("Should find second tabPanel", () => {
        expect(wrapper.find("TabPanel").at(1)).toHaveLength(1);
    });

    it("Should find tabPanel with PostList", () => {
        expect(
            wrapper
                .find("TabPanel")
                .at(0)
                .find("PostList"),
        ).toHaveLength(1);
    });
    it("Should find second tabPanel with PostList", () => {
        expect(
            wrapper
                .find("TabPanel")
                .at(1)
                .find("PostList"),
        ).toHaveLength(1);
    });
});
