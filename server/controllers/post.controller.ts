import { Request, Response } from "express";
import models from "../models";
import dotenv from "dotenv";

dotenv.config();
export default {
  getPosts: async (req: any, res: Response) => {
    // use async/await here
    const posts = await models.Post.findAll({
      include: [
        { model: models.User, as: "author", attributes: ["username"] },
        // limit the likes based on the logged in user
        {
          model: models.Likes
        }
      ],
      order: [["createdAt", "DESC"]],
      limit: 6
    });

    posts.forEach(post => {
      if (post.Likes.length === 0) {
        post.setDataValue("likedByMe", false);
      }
      post.Likes.forEach(like => {
        console.log(like.userId);
        if (like.userId === req.session.user.id) {
          post.setDataValue("likedByMe", true);
        } else {
          post.setDataValue("likedByMe", false);
        }
      });
    });

    return res.json(posts);
  },
  createPost: async (req: any, res: Response) => {
    // console.log(getUser);
    const postData = {
      title: req.body.title,
      postContent: req.body.postContent,
      userId: req.session.user.id
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
          newPost.setDataValue("likedByMe", false);
          return res.status(200).send({
            message: "post created",
            post: newPost
          });
        });
      })
      .catch(err => {
        return res.status(401).send({
          message: `Something went wrong`,
          error: err
        });
      });
    console.log(req.body);
  },
  likePost: async (req: any, res: Response) => {
    // fetch created and post at the same time

    const [created, post] = await Promise.all([
      models.Likes.findOne({
        where: {
          userId: req.session.user.id,
          resourceId: req.params.id
        }
      }),
      models.Post.findOne({
        where: {
          id: req.params.id
        }
      })
    ]);

    // no post, no updates
    if (!post) {
      return res.status(200).send({
        message: "there is no post to be liked"
      });
    }

    // we are going to make updates, so use a transaction, you will need to reference sequelize
    let transaction;
    try {
      transaction = await models.sequelize.transaction();

      if (!created && post) {
        // use Promise.all() for concurrency
        await Promise.all([
          models.Likes.create(
            {
              userId: req.session.user.id,
              resourceId: req.params.id
            },
            { transaction }
          ),
          post.increment("likeCounts", { by: 1, transaction })
        ]);

        await transaction.commit();

        return res.status(200).json({
          message: "You liked this post"
        });
      }
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      console.log("There was an error", err);
      return res.status(500);
    }
  },

  disLikePost: async (req: any, res: Response) => {
    const [created, post] = await Promise.all([
      models.Likes.findOne({
        where: {
          userId: req.session.user.id,
          resourceId: req.params.id
        }
      }),
      models.Post.findOne({
        where: {
          id: req.params.id
        }
      })
    ]);
    // no post, no updates
    if (!post) {
      return res.status(200).json({
        message: "there is no post to be unliked"
      });
    }
    let transaction;
    try {
      transaction = await models.sequelize.transaction();

      await Promise.all([
        models.Likes.destroy(
          {
            where: {
              userId: req.session.user.id,
              resourceId: req.params.id
            }
          },
          { transaction }
        ),
        post.decrement("likeCounts", { by: 1, transaction })
      ]);

      await transaction.commit();

      return res.status(200).json({
        message: "You unliked this post"
      });
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      console.log("There was an error", err);
      return res.status(500);
    }
  }
};
