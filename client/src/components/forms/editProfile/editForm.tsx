import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { EditProfileFormType } from '../../../utils/types';

const EditProfileForm = ({
    onSubmit, bio, gravatar, handleBio, handleGravatar,
}: EditProfileFormType) => (
    <form onSubmit={onSubmit} data-testid="edit-form">
        <Typography variant="subtitle1">Edit Profile</Typography>
        <FormGroup style={{ padding: '30px 0px' }}>
            <FormLabel data-testid="form-bio-label" style={{ display: 'block' }}>
                Bio
            </FormLabel>
            <TextField
                id="outlined-name"
                className="bio-test"
                data-testid="bio-test"
                style={{
                    width: '100%',
                }}
                name="bio"
                inputProps={{
                    'data-testid': 'bio',
                }}
                multiline
                rows="3"
                defaultValue={bio}
                onChange={handleBio}
                margin="normal"
                variant="outlined"
            />
            <FormLabel data-testid="form-gravatar-label" style={{ display: 'block' }}>
                Gravatar
            </FormLabel>
            <TextField
                id="outlined-name"
                data-testid="gravatar-test"
                style={{
                    width: '100%',
                }}
                inputProps={{
                    'data-testid': 'gravatar',
                }}
                name="gravatar"
                multiline
                rows="3"
                onChange={handleGravatar}
                defaultValue={gravatar}
                margin="normal"
                variant="outlined"
            />
        </FormGroup>
        <Button data-testid="button-test" className="subBtn" variant="outlined" color="primary" type="submit">
            Submit
        </Button>
    </form>
);

export default EditProfileForm;
