import * as express from "express";
import postRouter from "./post.router";
import userRouter from "./user.router";
const router: express.Router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
export default router;
