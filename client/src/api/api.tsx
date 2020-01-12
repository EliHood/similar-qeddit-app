import Axios from "../Axios";

export default {
  user: {
    signUp: (userData: any) =>
      Axios.post("/api/v1/users/signup", userData).then(res => res.data),
    autoLogin: () => Axios.get("/api/v1/users/auth").then(res => res.data),
    logOut: () => Axios.get("/api/v1/users/logout").then(res => res.data),
    logIn: (userData: any) =>
      Axios.post("/api/v1/users/login", userData).then(res => res.data),
    currentUser: () =>
      Axios.get("/api/v1/users/currentUser").then(res => res.data),
    editProfile: () =>
      Axios.get("/api/v1/users/editProfile").then(res => res.data),
    updateProfile: (userData: any) =>
      Axios.put("/api/v1/users/updateProfile", userData).then(res => res.data)
  },
  post: {
    createPost: (postData: any) =>
      Axios.post("/api/v1/posts/createPost", postData).then(res => res.data),
    getPosts: () => Axios.get("/api/v1/posts/getPosts").then(res => res.data),
    likePost: (id: number) =>
      Axios.post(`/api/v1/posts/likePost/${id}`).then(res => res.data),
    getPost: (id: number) => Axios.get(`/api/v1/posts/post/${id}`).then(res => res.data ),
    dislikePost: (id: number) =>
      Axios.post(`/api/v1/posts/dislikePost/${id}`).then(res => res.data)
  }
};
