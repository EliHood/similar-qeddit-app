export default {
  // save logged session
  setUserLoggedIn: (token: any) => {
    localStorage.setItem("jwtToken", token);
  },
  // remove token
  setUserLoggdOut: () => {
    localStorage.removeItem("jwtToken");
  },
  //   check if a user is signed in and stuff
  getLoginStatus: () =>
    localStorage.getItem("jwtToken") !== "null" ? true : false
};
