import * as express from "express";
import { userController } from "../controllers";

const router: express.Router = express.Router();
router.post("/signup", userController.signUpUser);
router.get("/logOut", userController.logOut);
router.post("/login", userController.signInUser);
router.get("/getUsers", userController.getUsers);
export default router;
