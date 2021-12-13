import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { store } from '../store';
import LikeButton from './LikeButton';

const mockProps = {
    type: 'liked',
    likeCounts: 3,
};
const mockProps2 = {
    type: 'unliked',
    likeCounts: 3,
};
describe('Should test <Like/> component', () => {
    it('should render filled heart', () => {
        const container = mount(
            <Provider store={store}>
                <LikeButton {...mockProps} />
            </Provider>,
        );
        expect(container.find(FavoriteIcon).at(0)).toHaveLength(1);
    });

    it('should render unfilled heart', () => {
        const container = mount(
            <Provider store={store}>
                <LikeButton {...mockProps2} />
            </Provider>,
        );
        expect(container.find(FavoriteBorderIcon).at(0)).toHaveLength(1);
    });

    it('should test onClick of liked button', () => {
        const mockFn = jest.fn();
        const container = mount(
            <Provider store={store}>
                <LikeButton {...mockProps2} like={mockFn} />
            </Provider>,
        );

        container
            .find('span')
            .at(0)
            .simulate('click');
        expect(mockFn).toHaveBeenCalled();
    // how should i pass jest.fn() to the onClick prop ?
    });
    it('should test onClick of unliked button', () => {
        const mockFn = jest.fn();
        const container = mount(
            <Provider store={store}>
                <LikeButton {...mockProps} dislike={mockFn} />
            </Provider>,
        );

        container
            .find('span')
            .at(0)
            .simulate('click');
        expect(mockFn).toHaveBeenCalled();
    // how should i pass jest.fn() to the onClick prop ?
    });
});
