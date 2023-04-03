import { Alert, AlertTitle } from '@material-ui/lab'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors, userActions } from '@mfe/redux-store/src'
import { useLocation } from 'react-router-dom'
import GridHoc from '../../hoc/grid'

function EmailConfirmationSuccess(props) {
    const didMountRef = useRef<boolean>(false)
    const dispatch = useDispatch()
    const user = useSelector(selectors.userConfirmation)
    const error = useSelector(selectors.userError)
    const emailConfirmation = <T,>(payload: T) =>
        dispatch(userActions.emailConfirmationInit(payload))
    const location = useLocation();
    const tokenUrl = location?.pathname.split('/');
    const parsedToken = tokenUrl[tokenUrl.length - 1]
    const userId = tokenUrl[2]
    const userEmailData = { userId, parsedToken }
    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            emailConfirmation(userEmailData)
        }
        return () => {
            didMountRef.current = false
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
