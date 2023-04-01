import React from 'react'
import { useSelector, useDispatch, } from 'react-redux'
import { userActions, selectors } from '@mfe/redux-store/src'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import GridHoc from '../../hoc/grid'

export type IEmailConfirmation = {
    location: any
}

const ResendEmailCard = styled.span`
    cursor: pointer;
`

function EmailConfirmation() {
    const dispatch = useDispatch()
    const location = useLocation();
    const user = useSelector(selectors.userConfirmation)
    const resendEmail = () =>
        dispatch(userActions.resendEmailConfirmationInit())
    const emailMessage = user || location?.state?.meta?.message
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
