import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userActions, selectors } from '@mfe/redux-store';
import styled from 'styled-components'
import GridHoc from '../hoc/grid'


export type IEmailConfirmation = {
    location: any
}

const ResendEmailCard = styled.span`
    cursor: pointer;
`

function EmailConfirmation({ location }: IEmailConfirmation) {
    const dispatch = useDispatch()
    const user = useSelector(selectors.userConfirmation)
    const resendEmail = () => dispatch(userActions.resendEmailConfirmationInit())
    const emailMessage = user || location.state.meta.message

    return (
        <>
            <h3>{emailMessage}</h3>
            <ResendEmailCard onClick={() => resendEmail()}>
                Resend Email Confirmation
            </ResendEmailCard>
        </>
    )
}

export default GridHoc(EmailConfirmation)
