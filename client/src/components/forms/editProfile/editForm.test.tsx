import "@testing-library/jest-dom";
import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditProfileForm from "./editForm";
import { render as testRender, fireEvent, screen } from "@testing-library/react";
const props = {
    handleChange: jest.fn(),
    onSubmit: jest.fn(),
    bio: "test",
    gravatar: "https://i.pravatar.cc/150?img=3",
    handleBio: jest.fn(),
    handleGravatar: jest.fn(),
};
const render = () => testRender(<EditProfileForm {...props} />);

describe("<EditProfileForm/>", () => {
    let wrapper;
    let mount;
    // beforeEach(() => {
    //     mount = createMount();
    //     wrapper = mount(<EditProfileForm {...props} />);
    // });

    // must be called first
    it("should render <EditProfileComponent/>", () => {
        const editProfile = render(<EditProfileForm {...props} />);
        expect(editProfile).toBeTruthy();
    });
    it("calls handleBio on bio TextField change", () => {
        render();
        const input = screen.getByTestId("bio");

        fireEvent.change(input, { target: { value: "new value" } });

        expect(props.handleBio).toHaveBeenCalledTimes(1);
    });

    it("calls handleGravatar on gravatar TextField change", () => {
        render();
        const input = screen.getByTestId("gravatar");

        fireEvent.change(input, { target: { value: "https://i.pravatar.cc/150?img=4" } });

        expect(props.handleGravatar).toHaveBeenCalledTimes(1);
    });

    it("should check header title", () => {
        const { getByText } = render(<EditProfileForm {...props} />);
        expect(getByText("Edit Profile")).toBeInTheDocument();
    });

    it("should check for Form Lable", () => {
        const { getByTestId } = render(<EditProfileForm {...props} />);
        expect(getByTestId("form-bio-label")).toBeInTheDocument();
    });

    it("should check for Form Lable", () => {
        const { getByTestId } = render(<EditProfileForm {...props} />);
        expect(getByTestId("form-gravatar-label")).toBeInTheDocument();
    });

    it("should check for first textfield element", () => {
        const { getByTestId } = render(<EditProfileForm {...props} />);
        expect(getByTestId(/bio-test/i)).toBeTruthy();
    });
    it("should check for second textfield element", () => {
        const { getByTestId } = render(<EditProfileForm {...props} />);
        expect(getByTestId(/gravatar-test/i)).toBeTruthy();
    });

    it("should test button click", () => {
        const { getByTestId } = render(<EditProfileForm {...props} />);
        fireEvent.click(getByTestId("button-test"));
    });

    it("should test onSubmit prop", () => {
        // console.log(wrapper.find(TextField).debug());
        const { getByTestId } = render(<EditProfileForm {...props} />);
        fireEvent.submit(getByTestId("edit-form"));
        expect(props.onSubmit).toHaveBeenCalled();
    });
});
