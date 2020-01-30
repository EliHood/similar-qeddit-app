"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const pusherConfig_1 = __importDefault(require("./pusherConfig"));
exports.default = {
    newCommentNotification(postId, commenterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield models_1.default.Post.findOne({ where: { id: postId }, });
            const commenter = yield models_1.default.User.findOne({ where: { id: commenterId } });
            const { userId, title } = post;
            const commenterName = commenter.username;
            console.log(commenterName);
            const body = `${commenterName} just commented on your article: ${title}`;
            console.log(body);
            yield models_1.default.Notification.create({ userId, body, status: 'unread' });
            pusherConfig_1.default.trigger('notification', 'my-event', body);
        });
    },
};
//# sourceMappingURL=notificationService.js.map