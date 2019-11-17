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
const controllers_1 = require("../controllers");
const passport_1 = __importDefault(require("passport"));
const router = express.Router();
router.post("/signup", controllers_1.userController.signUpUser);
router.get("/logOut", controllers_1.userController.logOut);
router.post("/login", controllers_1.userController.signInUser);
router.get("/getUsers", controllers_1.userController.getUsers);
router.get("/auth/google", passport_1.default.authenticate("google", { scope: ["email"] }));
router.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: process.env.ALLOW_ORIGIN
}));
router.get("/currentUser", controllers_1.userController.currentUser);
exports.default = router;
//# sourceMappingURL=user.router.js.map