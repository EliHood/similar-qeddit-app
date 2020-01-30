"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get('/:userId', controllers_1.notificationController.getAllNotifications);
// router.route('/:notificationId/mark-as-read').patch(verifyToken, markAsRead);
exports.default = router;
//# sourceMappingURL=notification.router.js.map