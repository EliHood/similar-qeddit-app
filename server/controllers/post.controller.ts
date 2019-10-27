import { Request, Response } from "express";
import models from "../models";
import dotenv from "dotenv";
import { access } from "fs";
import { Sequelize } from "sequelize-typescript";

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
            { model: models.User, as: "author", attributes: ["username"] },
            { model: models.Likes }
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
    const post = await models.Post.findByPk(id);
    const userId = req.session.user.id;
    if (userId == post.authorId) {
      if (post.liked === true) {
        post
          .update({
            liked: false,
            likeCounts: post.likeCounts === 0 ? 0 : --post.likeCounts
          })
          .then(unliked => {
            res.status(200).send({
              message: "You have unliked this post",
              post: unliked
            });
          });
      } else {
        post
          .update({
            liked: true,
            likeCounts: ++post.likeCounts
          })
          .then(liked => {
            res.status(200).send({
              message: "This post has been liked",
              post: liked
            });
          });
      }
    } else {
      res.status(500).send({
        message: "You are not the current user"
      });
    }
  }
};
