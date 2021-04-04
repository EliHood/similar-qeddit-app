import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import { ISignUpForm } from '../../../utils/types'

const SignUpForm = ({
    submit,
    usernameError,
    username,
    usernameChange,
    email,
    emailChange,
    emailError,
    password,
    passwordChange,
    passwordConf,
    passwordConfChange,
    passwordConfError,
    passwordError,
    disButton,
}: ISignUpForm) => {
    const ifPasswordError =
        passwordConfError === true || passwordConfError === ''
    const FormHelper = (
        <>
            {ifPasswordError && (
                <FormHelperText error id="component-helper-text">
                    {passwordConfError}
                </FormHelperText>
            )}
            <br />
            <br />
        </>
    )

    return (
        <form style={{ width: '100%' }} onSubmit={submit}>
            <TextField
                label="Username"
                style={{ width: '100%' }}
                name="username"
                value={username}
                error={!(usernameError === true || usernameError === '')}
                onChange={usernameChange}
                margin="normal"
            />
            <FormHelperText error id="component-helper-text">
                {usernameError}
            </FormHelperText>

            <TextField
                label="Email"
                className=""
                style={{ width: '100%' }}
                name="email"
                error={!(emailError === true || emailError === '')}
                value={email}
                onChange={emailChange}
                margin="dense"
            />
            <FormHelperText error id="component-helper-text">
                {emailError}
            </FormHelperText>
            <TextField
                label="Password"
                name="password"
                type="password"
                style={{ width: '100%' }}
                className=""
                error={!(passwordError === true || passwordError === '')}
                value={password}
                onChange={passwordChange}
                margin="dense"
            />
            <FormHelperText error id="component-helper-text">
                {passwordError}
            </FormHelperText>
            {password.length > 6 ? (
                <TextField
                    label="Confirm Pasword"
                    name="passwordConf"
                    type="password"
                    style={{ width: '100%' }}
                    className=""
                    error={
                        !(
                            passwordConfError === true ||
                            passwordConfError === ''
                        )
                    }
                    value={passwordConf}
                    onChange={passwordConfChange}
                    margin="dense"
                />
            ) : null}
            {FormHelper}

            <Button
                disabled={disButton}
                variant="outlined"
                color="primary"
                type="submit"
            >
                Sign Up
            </Button>
        </form>
    )
}

export default SignUpForm
