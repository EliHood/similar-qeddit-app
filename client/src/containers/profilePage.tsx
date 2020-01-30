import { connect } from "react-redux";
import { followUserInit, getProfileInit, unfollowUserInit } from "../actions/userActions";
import Profile from "../components/profile/profile";
const mapDispatchToProps = (dispatch: any) => ({
    getProfileInit: (data: string) => dispatch(getProfileInit(data)),
    unfollowUserInit: (username: string, id: number) => dispatch(unfollowUserInit(username, id)),
    followUserInit: (username: string, id: number) => dispatch(followUserInit(username, id)),
});

const mapStateToProps = (state: any) => ({
    user: state.user.profilePage,
    currentUser: state.user.currentUser,
    message: state.user.message,
    error: state.user.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
