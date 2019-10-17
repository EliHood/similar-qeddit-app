"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const sessionConfig_1 = __importDefault(require("../config/sessionConfig"));
exports.default = () => express_session_1.default(sessionConfig_1.default);
//# sourceMappingURL=useSession.js.map