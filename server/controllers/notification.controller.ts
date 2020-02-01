import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import models from "../models";

export default {
  async getAllNotifications(req: any, res: Response) {
    const { userId } = req.params;
    console.log(userId);
    const notification = await models.Notification.findAll({
      where: { userId }
    });

    const responseObject = notification.map(item => ({
      body: item.body,
      notificationId: item.id,
      status: item.status
    }));

    return res.send(responseObject);
  },

  markAsRead: async (req: any, res: Response) => {
    const { notificationId } = req.params;
    console.log("test", notificationId);
    const userId = req.session.user.id;
    console.log("dsdsdsdee", userId, notificationId);
    const notificationObject = await models.Notification.findOne({
      where: {
        userId,
        id: notificationId
      }
    });
    notificationObject
      .update({
        status: "read"
      })
      .then(async response => {
        console.log(response);
        const notifications = await models.Notification.findAll({
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
      });
  }
};
