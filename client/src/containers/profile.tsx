import { connect } from "react-redux";
import EditProfile from "../components/editProfile/editProfile";
import { getUserProfile, updateUserProfile } from "../actions/userActions";
const mapDispatchToProps = (dispatch: any) => ({
  getUserProfile: () => dispatch(getUserProfile()),
  updateUserProfile: userData => dispatch(updateUserProfile(userData))
});

const mapStateToProps = (state: any) => ({
  user: state.user.profileData,
  message: state.user.message,
  error: state.user.error
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
