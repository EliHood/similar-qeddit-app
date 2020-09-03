import React from "react";
import PostList from "./postList";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../../../store";
import posts from "../../../common/mockData.json";
import { BrowserRouter as Router } from "react-router-dom";
describe("Should render <PostList/>", () => {
    const mockProps = {
        posts: [],
        currentUser: {},
    };
    const mockProps2 = {
        posts: posts,
        currentUser: {},
    };

    it("should render <PostList/> no posts", () => {
        const container = mount(
            <Provider store={store}>
                <PostList {...mockProps} />
            </Provider>,
        );
        expect(container.find('[data-testid="no-posts"]').at(0)).toHaveLength(1);
    });
    it("should render <PostList/> posts", () => {
        const container = mount(
            <Provider store={store}>
                <Router>
                    <PostList {...mockProps2} />
                </Router>
            </Provider>,
        );
        expect(container.find('[data-testid="post-list"]')).toHaveLength(1);
    });
});
