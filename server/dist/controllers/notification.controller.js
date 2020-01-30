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
            const notification = yield models_1.default.Notification.findAll({
                where: { userId: userId, status: 'unread' }
            });
            const responseObject = notification.map(item => ({
                body: item.body, notficationId: item.id, status: item.status
            }));
            return res.send(responseObject);
        });
    },
    markAsRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { decoded: { id: userId }, params: { notificationId } } = req;
            const notificationObject = yield models_1.default.Notification.findOne({
                where: {
                    userId,
                    id: notificationId
                }
            });
            notificationObject.status = 'read';
            const response = yield notificationObject.save();
            return res.send({
                status: response.status,
                createdAt: response.createdAt
            });
        });
    }
};
//# sourceMappingURL=notification.controller.js.map