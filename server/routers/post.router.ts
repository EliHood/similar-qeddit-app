import * as express from "express";
import { postController } from "../controllers";

const router: express.Router = express.Router();
router.get("/getPosts", postController.getPosts);
router.post("/createPost", postController.createPost);
export default router;
