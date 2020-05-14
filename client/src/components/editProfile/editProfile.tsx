import React, { useEffect, Component, useRef, useState } from "react";
import Typography from "@material-ui/core/Typography";
import EditProfileForm from "../forms/editProfile/editForm";
import GridHoc from "../hoc/grid";
import { Grid } from "@material-ui/core";
export interface dashboardProps {
    getUserProfile: () => void;
    updateUserProfile: (any) => void;
    profileData: object;
    user?: any;
    message: string;
    error: string;
}
export interface dashboardState {
    bio: string;
    gravatar: string;
    prevProps: {
        bio: string;
        gravatar: string;
    };
}
function EditProfile(props: dashboardProps) {
    const [bio, setBio] = useState("");
    const [gravatar, setGravatar] = useState("");
    const mounted = useRef<Object>();
    useEffect(() => {
        if (!mounted.current) {
            props.getUserProfile();
            mounted.current = true;
        } else {
            setBio(bio ? bio : props.user.bio);
            setGravatar(gravatar ? gravatar : props.user.gravatar);
        }
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = {
            bio,
            gravatar,
        };
        console.log(formData);
        props.updateUserProfile(formData);
    };

    return (
        <Grid container={true} justify="center">
            <Grid item={true} xs={12} sm={12} md={8} lg={8}>
                {props.error && <Typography style={{ color: "red" }}>{props.message || props.error}</Typography>}
                {props.message && <Typography style={{ color: "green" }}>{props.message || props.error}</Typography>}
                <EditProfileForm handleBio={(e) => setBio(e.target.value)} handleGravatar={(e) => setGravatar(e.target.value)} onSubmit={handleSubmit} bio={bio} gravatar={gravatar} />
            </Grid>
        </Grid>
    );
}

export default GridHoc(EditProfile);
