import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import { store } from '../store';
import Date from './Date';

const mockProps = {
    type: 'post-date',
    createdAt: '2020-08-23T18:49:15.767Z',
};
const mockProps2 = {
    type: 'comment-date',
    createdAt: '2020-08-23T18:49:15.767Z',
};
const mockProps3 = {
    type: 'reply-date',
    createdAt: '2020-08-23T18:49:15.767Z',
};
describe('Should test <Date/> component', () => {
    it('should render <Date/> component', () => {
        const container = mount(
            <Provider store={store}>
                <Date {...mockProps} />
            </Provider>,
        );

        expect(container.find(Typography).at(0)).toHaveLength(1);
    });

    it('should test comment-date prop', () => {
        const container = mount(
            <Provider store={store}>
                <Date {...mockProps2} />
            </Provider>,
        );
        expect(container.find(Typography).at(0)).toHaveLength(1);
    });
    it('should test reply-date prop', () => {
        const container = mount(
            <Provider store={store}>
                <Date {...mockProps3} />
            </Provider>,
        );
        expect(container.find(Typography).at(0)).toHaveLength(1);
    });
});
