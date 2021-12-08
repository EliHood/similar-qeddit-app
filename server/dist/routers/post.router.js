"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
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
router.delete("/deleteReply/:postId/:userId/:id", controllers_1.postController.deleteReply);
router.delete("/deleteComment/:userId/:id", controllers_1.postController.deleteComment);
router.put("/editComment/:userId/:commentId", controllers_1.postController.editComment);
router.post("/createPost", controllers_1.postController.createPost);
router.post("/likePost/:id", controllers_1.postController.likePost);
router.post("/dislikePost/:id", controllers_1.postController.disLikePost);
router.post("/repost/:userId/:postId", controllers_1.postController.rePost);
router.delete("/unRepost/:userId/:postId", controllers_1.postController.unRePost);
router.post("/replyComment/:postId/:commentId", controllers_1.postController.replyComment);
router.get("/search?q=:searchQuery", controllers_1.postController.searchPosts);
router.get("/search?q=", controllers_1.postController.searchPosts);
exports.default = router;
//# sourceMappingURL=post.router.js.map