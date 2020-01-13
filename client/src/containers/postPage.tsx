import { connect } from "react-redux";
import { fetchPostInit } from "../actions/postActions";
import Post from "../components/post/post";
const mapDispatchToProps = (dispatch: any) => ({
    fetchPostInit: (id: number) => dispatch(fetchPostInit(id)),
});

const mapStateToProps = (state: any) => ({
 post: state.post.postPage,
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
