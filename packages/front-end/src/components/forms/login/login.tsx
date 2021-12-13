import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import { LoginType } from '../../../types'

const LoginForm = ({
    submit,
    username,
    password,
    passwordChange,
    usernameChange,
}: LoginType) => (
    <form style={{ width: '100%' }} onSubmit={submit}>
        <TextField
            label="Username"
            style={{ width: '100%' }}
            name="username"
            value={username}
            onChange={usernameChange}
            margin="normal"
        />
        <br />
        <TextField
            label="Password"
            name="password"
            type="password"
            style={{ width: '100%' }}
            className=""
            value={password}
            onChange={passwordChange}
            margin="normal"
        />
        {/*  */}
        <br />
        <br />

        <Button variant="outlined" color="primary" type="submit">
            Login
        </Button>
    </form>
)

export default LoginForm
