import { Request, Response } from "express";
import models from "../models";
import dotenv from "dotenv";
import { access } from "fs";
import { Sequelize } from "sequelize-typescript";
import { json } from "body-parser";

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
  createPost: async (req: any, res: Response) => {
    // console.log(getUser);
    const postData = {
      title: req.body.title,
      postContent: req.body.postContent,
      authorId: req.session.user.id
    };
    await models.Post.create(postData)
      .then(post => {
        models.Post.findOne({
          where: {
            id: post.id
          },
          include: [
            { model: models.User, as: "author", attributes: ["username"] }
          ]
        }).then(newPost => {
          res.status(200).send({
            message: "post created",
            post: newPost
          });
        });
      })
      .catch(err => {
        res.status(401).send({
          message: `Something went wrong`,
          error: err
        });
      });
    console.log(req.body);
  },
  likePost: async (req: any, res: Response) => {
    const id = req.params.id;
    console.log(id);
    console.log(req.session.user.id);
    models.Likes.findOne({
      where: { userId: req.session.user.id, resourceId: id }
    }).then(postLike => {
      if (postLike) {
        models.Likes.destroy({
          where: {
            userId: req.session.user.id,
            resourceId: id
          }
        }).then(unliked => {
          res.status(200).send({
            message: "like removed",
            likes: unliked
          });
        });
      } else {
        models.Likes.create({
          userId: req.session.user.id,
          likeByMe: true,
          resourceId: id
        }).then(liked => {
          res.status(200).send({
            message: "You like this post",
            likes: liked
          });
        });
      }
    });
  }
};
