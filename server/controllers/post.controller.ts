import { Request, Response } from "express";
import models from "../models";
import dotenv from "dotenv";
dotenv.config();
export default {
  getPosts: async (req: Request, res: Response) => {
    await models.Post.findAll({
      include: [
        { model: models.User, as: "author", attributes: ["username"] },
        { model: models.Likes }
      ],
      order: [["createdAt", "DESC"]],
      limit: 6
    }).then(posts => {
      res.json(posts);
    });
  },
  createPost: async (req: Request, res: Response) => {
    await models.Post.create({
      title: req.body.title,
      postContent: req.body.postContent,
      authorId: req.user.id
    })
      .then(post => {
        res.status(200).send({
          message: "post created",
          post: post
        });
      })
      .catch(err => {
        res.status(401).send({
          message: `Something went wrong`,
          error: err
        });
      });
    console.log(req.body);
  }
};
