import React, { useState, useEffect, useRef } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
export default function EmailConfirmationSuccess(props) {
    console.log(props)
    const didMountRef = useRef()
    useEffect(() => {
        if (!didMountRef.current) {
            // didMountRef.current = true
            props.emailConfirmationInit(props.match.params);

        } else {
            // console.log('this is component didupdate')
        }
    });
    return (
        <div>
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Thank you for Activating, login in here... <a href="/login">Login</a>
            </Alert>
        </div>
    )
}