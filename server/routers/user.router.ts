import * as express from "express";
import { userController } from "../controllers";
import { authenticationPolicy } from "../middlewares";
import passport from "passport";
const router: express.Router = express.Router();
router.post("/signup", userController.signUpUser);
router.get("/auth", authenticationPolicy, userController.tryAutoSignInUser);
router.get("/logOut", userController.logOut);
router.post("/login", userController.signInUser);
router.get("/getUsers", userController.getUsers);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: process.env.ALLOW_ORIGIN
  }),
  userController.googleOauth
);
router.get("/currentUser", userController.currentUser);
export default router;
