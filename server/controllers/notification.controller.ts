import models from '../models';
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

export default {
    async getAllNotifications(req:any, res:Response) {
      const { userId } = req.params
      const notification = await models.Notification.findAll({
        where: { userId: userId, status: 'unread' }
      });
  
      const responseObject = notification.map(item => ({
        body: item.body, notficationId: item.id, status: item.status
      }));
  
      return res.send(responseObject);
    },
  
    async markAsRead(req:any, res: Response) {
      const {
        decoded: { id: userId },
        params: { notificationId }
      } = req;
  
      const notificationObject = await models.Notification.findOne({
        where: {
          userId,
          id: notificationId
        }
      });
      notificationObject.status = 'read';
      const response = await notificationObject.save();
  
      return res.send({
        status: response.status,
        createdAt: response.createdAt
      });
    }
  };