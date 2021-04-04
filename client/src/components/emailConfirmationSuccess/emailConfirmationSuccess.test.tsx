import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { store } from '../../store'
import EmailConfirmationSuccess from './emailConfirmationSuccess'

const props = {
    match: {
        params: {},
    },
}

describe('Should render email confirmation success', () => {
    it('should render <CommentList/>', () => {
        const emailConfirmation = render(
            <Provider store={store}>
                <EmailConfirmationSuccess {...props} />
            </Provider>
        )
        expect(emailConfirmation).toBeTruthy()
    })

    it('should render error message', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <EmailConfirmationSuccess {...props} />
            </Provider>
        )
        expect(getByTestId('error-message')).toBeInTheDocument()
        expect(getByTestId('error-message')).toBeTruthy()
    })

    it('should render success message', () => {
        const wrapper = mount(
            <Provider store={store}>
                <EmailConfirmationSuccess {...props} />
            </Provider>
        )

        // const { result } = renderHook(() => useSelector(userConfirmation()));

        // expect(getByTestId("success-message")).toBeInTheDocument();
        // expect(getByTestId("success-message")).toBeTruthy();
    })
})
