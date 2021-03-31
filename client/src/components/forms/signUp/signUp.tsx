import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import React from 'react';

type SignUpFormInterface = {
  submit: (e) => void;
  usernameChange: (e) => void;
  emailChange: (e) => void;
  passwordChange: (e) => void;
  passwordConfChange: (e) => void;
  passwordConf: string;
  username: string;
  password: string;
  email: string;
  usernameError: any;
  passwordError: any;
  emailError: any;
  passwordConfError: any;
  disButton: boolean;
}

const SignUpForm = (props: SignUpFormInterface) => (
    <form style={{ width: '100%' }} onSubmit={props.submit}>
        <TextField
            label="Username"
            style={{ width: '100%' }}
            name="username"
            value={props.username}
            error={!(props.usernameError === true || props.usernameError === '')}
            onChange={props.usernameChange}
            margin="normal"
        />
        <FormHelperText error id="component-helper-text">
            {props.usernameError}
        </FormHelperText>

        <TextField
            label="Email"
            className=""
            style={{ width: '100%' }}
            name="email"
            error={!(props.emailError === true || props.emailError === '')}
            value={props.email}
            onChange={props.emailChange}
            margin="dense"
        />
        <FormHelperText error id="component-helper-text">
            {props.emailError}
        </FormHelperText>
        <TextField
            label="Password"
            name="password"
            type="password"
            style={{ width: '100%' }}
            className=""
            error={!(props.passwordError === true || props.passwordError === '')}
            value={props.password}
            onChange={props.passwordChange}
            margin="dense"
        />
        <FormHelperText error id="component-helper-text">
            {props.passwordError}
        </FormHelperText>
        {props.password.length > 6 ? (
            <TextField
                label="Confirm Pasword"
                name="passwordConf"
                type="password"
                style={{ width: '100%' }}
                className=""
                error={!(props.passwordConfError === true || props.passwordConfError === '')}
                value={props.passwordConf}
                onChange={props.passwordConfChange}
                margin="dense"
            />
        ) : null}
        {props.passwordConfError === true || props.passwordConfError === '' ? (
            false
        ) : true ? (
            <FormHelperText error id="component-helper-text">
                {props.passwordConfError}
            </FormHelperText>
        ) : null}
        <br />
        <br />
        <Button disabled={props.disButton} variant="outlined" color="primary" type="submit">
            Sign Up
        </Button>
    </form>
);

export default SignUpForm;
