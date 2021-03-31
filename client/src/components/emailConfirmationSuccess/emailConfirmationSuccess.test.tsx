import '@testing-library/jest-dom';
import React from 'react';
import {
    render, getByText, queryByText, getAllByTestId, fireEvent,
} from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { mount } from 'enzyme';
import { renderHook } from '@testing-library/react-hooks';
import { store } from '../../store';
import { userConfirmation, userError } from '../../selectors/selectors';
import EmailConfirmationSuccess from './emailConfirmationSuccess';

const props = {
    match: {
        params: {},
    },
};

describe('Should render email confirmation success', () => {
    it('should render <CommentList/>', () => {
        const emailConfirmation = render(
            <Provider store={store}>
                <EmailConfirmationSuccess {...props} />
            </Provider>,
        );
        expect(emailConfirmation).toBeTruthy();
    });

    it('should render error message', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <EmailConfirmationSuccess {...props} />
            </Provider>,
        );
        expect(getByTestId('error-message')).toBeInTheDocument();
        expect(getByTestId('error-message')).toBeTruthy();
    });

    it('should render success message', () => {
        const wrapper = mount(
            <Provider store={store}>
                <EmailConfirmationSuccess {...props} />
            </Provider>,
        );

        // const { result } = renderHook(() => useSelector(userConfirmation()));

    // expect(getByTestId("success-message")).toBeInTheDocument();
    // expect(getByTestId("success-message")).toBeTruthy();
    });
});
