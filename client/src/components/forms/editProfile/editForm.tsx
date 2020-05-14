import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
const EditProfileForm = (props: any) => (
    <form onSubmit={props.onSubmit}>
        <Typography variant="h5">Edit Profile</Typography>
        <FormGroup style={{ padding: "30px 0px" }}>
            <FormLabel style={{ display: "block" }}>Bio</FormLabel>
            <TextField
                id="outlined-name"
                style={{
                    width: "100%",
                }}
                name="bio"
                multiline={true}
                rows="3"
                defaultValue={props.bio}
                onChange={props.handleBio}
                margin="normal"
                variant="outlined"
            />
            <FormLabel style={{ display: "block" }}>Gravatar</FormLabel>
            <TextField
                id="outlined-name"
                style={{
                    width: "100%",
                }}
                name="gravatar"
                multiline={true}
                rows="3"
                onChange={props.handleGravatar}
                defaultValue={props.gravatar}
                margin="normal"
                variant="outlined"
            />
        </FormGroup>
        <Button className="subBtn" variant="outlined" color="primary" type="submit">
            Submit
        </Button>
    </form>
);

export default EditProfileForm;
