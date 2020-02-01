import express from "express";
import { notificationController, userController } from "../controllers";
const router = express.Router();

router.get("/:userId", notificationController.getAllNotifications);

router.post("/markAsRead/:notificationId", notificationController.markAsRead);

export default router;
