import React from "react";
import LikeButton from "./LikeButton";
import { Provider } from "react-redux";
import { store } from "../store";
import { shallow, mount } from "enzyme";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
const mockProps = {
    type: "liked",
    likeCounts: 3,
};
const mockProps2 = {
    type: "unliked",
    likeCounts: 3,
};
describe("Should test <Like/> component", () => {
    it("should render filled heart", () => {
        const container = mount(
            <Provider store={store}>
                <LikeButton {...mockProps} />
            </Provider>,
        );
        expect(container.find(FavoriteIcon).at(0)).toHaveLength(1);
    });

    it("should render unfilled heart", () => {
        const container = mount(
            <Provider store={store}>
                <LikeButton {...mockProps2} />
            </Provider>,
        );
        expect(container.find(FavoriteBorderIcon).at(0)).toHaveLength(1);
    });
});
