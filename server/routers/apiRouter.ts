import * as express from "express";
import userRouter from "./user.router";
import postRouter from "./post.router";
const router: express.Router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
export default router;
