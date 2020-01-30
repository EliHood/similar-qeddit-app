import * as express from "express";
import notificationRouter from "./notification.router";
import postRouter from "./post.router";
import userRouter from "./user.router";
const router: express.Router = express.Router();
router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/notifications", notificationRouter);
export default router;
