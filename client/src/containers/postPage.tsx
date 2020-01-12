import { connect } from "react-redux";
import Post from '../components/post/post'
import { fetchPostInit } from "../actions/postActions";
const mapDispatchToProps = (dispatch: any) => ({
    fetchPostInit: (id: number) => dispatch( fetchPostInit(id))
});

const mapStateToProps = (state: any) => ({
 post: state.post.postPage
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
