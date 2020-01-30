"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const post_router_1 = __importDefault(require("./post.router"));
const user_router_1 = __importDefault(require("./user.router"));
const notification_router_1 = __importDefault(require("./notification.router"));
const router = express.Router();
router.use("/users", user_router_1.default);
router.use("/posts", post_router_1.default);
router.use('/notifications', notification_router_1.default);
exports.default = router;
//# sourceMappingURL=apiRouter.js.map