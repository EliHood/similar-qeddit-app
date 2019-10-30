import * as express from "express";
import { postController } from "../controllers";
import { authenticationPolicy } from "../middlewares";
const router: express.Router = express.Router();
router.get("/getPosts", postController.getPosts);
router.post("/createPost", postController.createPost);
router.post("/likePost/:id", postController.likePost);
export default router;
