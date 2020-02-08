import React from "react";
import { createShallow, createMount } from "@material-ui/core/test-utils";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import EditProfileForm from "./editForm";
const props = {
    handleChange: jest.fn(),
    onSubmit: jest.fn(),
    bio: "test",
    gravatar: "https://i.pravatar.cc/150?img=3",
};
describe("<EditProfileForm/>", () => {
    let wrapper;
    let mount;
    beforeEach(() => {
        mount = createMount();
        wrapper = mount(<EditProfileForm {...props} />);
    });

    it("should render <EditProfileForm/>", () => {
        expect(wrapper).toHaveLength(1);
    });

    it("should check header title ", () => {
        expect(wrapper.find(Typography).at(0)).toHaveLength(1);
        expect(
            wrapper
                .find(Typography)
                .at(0)
                .text(),
        ).toContain("Edit Profile");
    });

    it("should test bio prop", () => {
        expect(wrapper.props().bio).toContain("test");
    });

    it("should test gravtar prop", () => {
        const link = "https://i.pravatar.cc/150?img=3";
        expect(wrapper.props().gravatar).toContain(link);
    });

    it("should test handleChange props", () => {
        const title = "Test";
        expect(
            wrapper.props().handleChange({
                target: {
                    value: title,
                },
            }),
        );
        expect(props.handleChange).toHaveBeenCalled();
    });

    it("should test onSubmit prop", () => {
        // console.log(wrapper.find(TextField).debug());
        const submit = jest.fn();
        wrapper.simulate("submit", { submit });
        expect(props.onSubmit).toBeCalled();
    });

    it("should test button click", () => {
        const button = wrapper.find(Button);
        button.simulate("click");
        expect(props.onSubmit).toBeCalled();
    });
});
