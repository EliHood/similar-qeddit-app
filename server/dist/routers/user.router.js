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
router.post("/signup", controllers_1.userController.signUpUser);
router.get("/logOut", controllers_1.userController.logOut);
router.post("/login", controllers_1.userController.signInUser);
router.get("/getUsers", controllers_1.userController.getUsers);
exports.default = router;
//# sourceMappingURL=user.router.js.map