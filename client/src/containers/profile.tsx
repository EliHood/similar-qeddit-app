import { connect } from "react-redux";
import { getUserProfile, updateUserProfile } from "../actions/userActions";
import EditProfile from "../components/editProfile/editProfile";
const mapDispatchToProps = (dispatch: any) => ({
  getUserProfile: () => dispatch(getUserProfile()),
  updateUserProfile: (userData) => dispatch(updateUserProfile(userData)),
});

const mapStateToProps = (state: any) => ({
  user: state.user.profileData,
  message: state.user.message,
  error: state.user.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
