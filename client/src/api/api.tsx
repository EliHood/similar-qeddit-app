import Axios from "../Axios";

export default {
  user: {
    signUp: (userData: any) =>
      Axios.post("/api/v1/users/signup", userData).then(res => res.data),
    autoLogin: () => Axios.get("/api/v1/users/auth").then(res => res.data),
    logOut: () => Axios.get("/api/v1/users/logout").then(res => res.data),
    logIn: (userData: any) =>
      Axios.post("/api/v1/users/login", userData).then(res => res.data)
  },
  post: {
    createPost: (postData: any) =>
      Axios.post("/api/v1/posts/createPost", postData).then(res => res.data),
    getPosts: () => Axios.get("/api/v1/posts/getPosts").then(res => res.data)
  }
};
