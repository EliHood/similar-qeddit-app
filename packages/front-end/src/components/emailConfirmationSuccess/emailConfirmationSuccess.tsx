import { Alert, AlertTitle } from '@material-ui/lab'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors, userActions } from '@mfe/redux-store/src'
import GridHoc from '../hoc/grid'

function EmailConfirmationSuccess(props) {
    const didMountRef = useRef()
    const dispatch = useDispatch()
    const user = useSelector(selectors.userConfirmation)
    const error = useSelector(selectors.userError)
    const emailConfirmation = (payload: object) =>
        dispatch(userActions.emailConfirmationInit(payload))
    useEffect(() => {
        if (!didMountRef.current) {
            // didMountRef.current = true
            // console.log("email confirmation");
            emailConfirmation(props.match.params)
        } else {
            console.log('this is component didupdate')
        }
    }, [didMountRef])

    return (
        <div data-testid="message">
            {user.includes('Thank you') ? (
                <div data-testid="success-message">
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {user} <a href="/login">Login</a>
                    </Alert>
                </div>
            ) : (
                <div data-testid="error-message">
                    <Alert severity="warning">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                </div>
            )}
        </div>
    )
}

export default GridHoc(EmailConfirmationSuccess)
