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
    const created = await models.Likes.findOne({
      where: {
        userId: req.session.user.id,
        resourceId: req.params.id
      }
    });
    console.log(created);
    const post = await models.Post.findOne({ where: { id: req.params.id } });
    // if like not created then do this
    if (!created && post) {
      await models.Likes.create({
        userId: req.session.user.id,
        resourceId: req.params.id
      }).then(() => {
        post.increment("likeCounts", { by: 1 });
        res.status(200).send({
          message: "You liked this post"
        });
      });
      // else if post does not exist
    } else if (!post) {
      res.status(200).send({
        message: "there is not post to be liked"
      });
    } else {
      // else if a like does exist destroy like
      await models.Likes.destroy({
        where: {
          userId: req.session.user.id
        }
      }).then(() => {
        post.decrement("likeCounts", { by: 1 });
        res.status(200).send({
          message: "You unliked this post"
        });
      });
    }
  }
};
