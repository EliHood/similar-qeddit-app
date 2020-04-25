"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const controllers_1 = require("../controllers");
const router = express.Router();
router.get("/getPosts", controllers_1.postController.getPosts);
router.get("/post/:id", controllers_1.postController.postPage);
router.post("/postComment", controllers_1.postController.postComment);
router.delete("/deletePost/:userId/:id", controllers_1.postController.deletePost);
router.delete("/deleteComment/:userId/:id", controllers_1.postController.deleteComment);
router.put("/editComment/:userId/:commentId", controllers_1.postController.editComment);
router.post("/createPost", controllers_1.postController.createPost);
router.post("/likePost/:id", controllers_1.postController.likePost);
router.post("/dislikePost/:id", controllers_1.postController.disLikePost);
exports.default = router;
//# sourceMappingURL=post.router.js.map