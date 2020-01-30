import express from "express";
import { notificationController } from "../controllers";
const router = express.Router();

router.get("/:userId", notificationController.getAllNotifications);

// router.route('/:notificationId/mark-as-read').patch(verifyToken, markAsRead);

export default router;
