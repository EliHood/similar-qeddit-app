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
exports.default = {
    getAllNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            console.log(userId);
            const notification = yield models_1.default.Notification.findAll({
                where: { userId, status: "unread" }
            });
            const responseObject = notification.map(item => ({
                body: item.body,
                notificationId: item.id,
                status: item.status
            }));
            return res.send(responseObject);
        });
    },
    markAsRead: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { notificationId } = req.params;
        console.log("test", notificationId);
        const userId = req.session.user.id;
        console.log("dsdsdsdee", userId, notificationId);
        const notificationObject = yield models_1.default.Notification.findOne({
            where: {
                userId,
                id: notificationId
            }
        });
        notificationObject
            .update({
            status: "read"
        })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(response);
            const notifications = yield models_1.default.Notification.findAll({
                where: { userId }
            });
            const responseObject = notifications.map(item => ({
                body: item.body,
                notificationId: item.id,
                status: item.status
            }));
            // console.log(notifications);
            return res.status(200).send({
                notifications: responseObject,
                status: response.status,
                createdAt: response.createdAt
            });
        }));
    })
};
//# sourceMappingURL=notification.controller.js.map