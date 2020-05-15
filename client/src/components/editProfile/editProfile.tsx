import React, { useEffect, Component, useRef, useState } from "react";
import Typography from "@material-ui/core/Typography";
import EditProfileForm from "../forms/editProfile/editForm";
import GridHoc from "../hoc/grid";
import { Grid } from "@material-ui/core";
import storeMethods from "../../common/storeHooks";

function EditProfile(props: any) {
    const [bio, setBio] = useState("");
    const [gravatar, setGravatar] = useState("");
    const mounted = useRef<Object>();
    const { getProfile, profileData, userErr, message, updateProfile } = storeMethods();
    useEffect(() => {
        if (!mounted.current) {
            getProfile();
            mounted.current = true;
        } else {
            setBio(bio ? bio : profileData.bio);
            setGravatar(gravatar ? gravatar : profileData.gravatar);
        }
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = {
            bio,
            gravatar,
        };
        updateProfile(formData);
    };

    return (
        <Grid container={true} justify="center">
            <Grid item={true} xs={12} sm={12} md={8} lg={8}>
                {userErr && <Typography style={{ color: "red" }}>{message || userErr}</Typography>}
                {message && <Typography style={{ color: "green" }}>{message || userErr}</Typography>}
                <EditProfileForm handleBio={(e) => setBio(e.target.value)} handleGravatar={(e) => setGravatar(e.target.value)} onSubmit={handleSubmit} bio={bio} gravatar={gravatar} />
            </Grid>
        </Grid>
    );
}

export default GridHoc(EditProfile);
