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
            console.log('this is component didupdate')
        }
    });
    console.log(props)
    return (
        <div>
            {props.user.includes("Thank you") ? (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {props.user} <a href="/login">Login</a>
                </Alert>
            ) : (
                    <Alert severity="warning">
                        <AlertTitle>Error</AlertTitle>
                        {props.error}
                    </Alert>
                )}
        </div>
    )
}