import * as express from "express";
import passport from "passport";
import { userController } from "../controllers";
const router: express.Router = express.Router();
router.post("/signup", userController.signUpUser);
router.get("/logOut", userController.logOut);
router.post("/login", userController.signInUser);
router.get("/getUsers", userController.getUsers);
router.get("/editProfile", userController.editProfile);
router.put("/updateProfile", userController.updateProfile);
router.post('/resendConfirmation', userController.resendEmailConfirmation);
router.get("/emailConfirmation/:userId/:token", userController.emailConfirmationToken)
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: process.env.ALLOW_ORIGIN
  })
);
router.get("/currentUser", userController.currentUser);
export default router;
