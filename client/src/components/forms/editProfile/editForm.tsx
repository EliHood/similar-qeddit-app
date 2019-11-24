import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
const EditProfileForm = (props: any) => (
  <form onSubmit={props.onSubmit}>
    <Typography variant="h5">Edit Profile</Typography>
    <FormGroup style={{ padding: "30px 0px" }}>
      <FormLabel style={{ display: "block" }}>Bio</FormLabel>
      <TextField
        id="outlined-name"
        style={{
          width: 560
        }}
        name="bio"
        multiline
        rows="4"
        value={props.bio}
        onChange={props.handleChange}
        margin="normal"
        variant="outlined"
      />
      <FormLabel style={{ display: "block" }}>Gravatar</FormLabel>
      <TextField
        id="outlined-name"
        style={{
          width: 560
        }}
        name="gravatar"
        multiline
        rows="3"
        onChange={props.handleChange}
        value={props.gravatar}
        margin="normal"
        variant="outlined"
      />
    </FormGroup>
    <Button variant="outlined" color="primary" type="submit">
      Submit
    </Button>
  </form>
);

export default EditProfileForm;
