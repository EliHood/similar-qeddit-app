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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const passport_1 = __importDefault(require("passport"));
const controllers_1 = require("../controllers");
const router = express.Router();
router.post("/signup", controllers_1.userController.signUpUser);
router.get("/logOut", controllers_1.userController.logOut);
router.post("/login", controllers_1.userController.signInUser);
router.get("/getUsers", controllers_1.userController.getUsers);
router.get("/editProfile", controllers_1.userController.editProfile);
router.put("/updateProfile", controllers_1.userController.updateProfile);
router.get("/profile/:username", controllers_1.userController.profile);
router.post("/followUser/:username", controllers_1.userController.followUser);
router.delete("/unfollowUser/:username", controllers_1.userController.unFollowUser);
router.post("/resendConfirmation", controllers_1.userController.resendEmailConfirmation);
router.get("/emailConfirmation/:userId/:token", controllers_1.userController.emailConfirmationToken);
router.get("/auth/google", passport_1.default.authenticate("google", { scope: ["email"] }));
router.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: process.env.ALLOW_ORIGIN,
}));
router.get("/currentUser", controllers_1.userController.currentUser);
exports.default = router;
//# sourceMappingURL=user.router.js.map