import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import EditProfileForm from "../forms/editProfile/editForm";
import GridHoc from "../hoc/grid";
import { Grid } from "@material-ui/core";
export interface dashboardProps {
    getUserProfile: () => void;
    updateUserProfile: (any) => void;
    profileData: object;
    user: object;
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
class EditProfile extends Component<dashboardProps, dashboardState> {
    // deprecated
    // componentWillReceiveProps(nextProps) {
    //   this.setState({
    //     bio: nextProps.user.bio,
    //     gravatar: nextProps.user.gravatar
    //   });
    // }
    // gets, the data, and makes fields editable
    static getDerivedStateFromProps(props, state) {
        const { prevProps } = state;
        const { bio, gravatar } = props.user;
        return {
            // Store the previous props in state
            prevProps: { bio, gravatar },
            bio: prevProps.bio !== bio ? bio : state.bio,
            gravatar: prevProps.gravatar !== gravatar ? gravatar : state.gravatar,
        };
    }
    state: dashboardState = {
        prevProps: {
            bio: "",
            gravatar: "",
        },
        bio: "",
        gravatar: "",
    };
    componentDidMount() {
        this.props.getUserProfile();
    }

    handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value,
        } as any);
    };
    handleSubmit = (e: any) => {
        e.preventDefault();
        const { bio, gravatar } = this.state;
        const formData = {
            bio,
            gravatar,
        };
        console.log(formData);
        this.props.updateUserProfile(formData);
    };
    render() {
        const { bio, gravatar } = this.state;

        return (
            <Grid container={true} justify="center">
                <Grid item={true} xs={12} sm={12} md={8} lg={8}>
                    {this.props.error && <Typography style={{ color: "red" }}>{this.props.message || this.props.error}</Typography>}
                    {this.props.message && <Typography style={{ color: "green" }}>{this.props.message || this.props.error}</Typography>}
                    <EditProfileForm handleChange={this.handleChange} onSubmit={this.handleSubmit} bio={bio} gravatar={gravatar} />
                </Grid>
            </Grid>
        );
    }
}

export default GridHoc(EditProfile);
