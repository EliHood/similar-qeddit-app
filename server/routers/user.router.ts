import * as express from "express";
import { userController } from "../controllers";
import { authenticationPolicy } from "../middlewares";

const router: express.Router = express.Router();
router.post("/signup", userController.signUpUser);
router.get("/auth", authenticationPolicy, userController.tryAutoSignInUser);
router.get("/logOut", userController.logOut);
router.post("/login", userController.signInUser);
router.get("/getUsers", userController.getUsers);
export default router;
