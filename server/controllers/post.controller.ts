import { Request, Response } from "express";
import models from "../models";
import dotenv from "dotenv";
import sequelize from "sequelize";

dotenv.config();
export default {
  getPosts: async (req: any, res: Response) => {
    // use async/await here
    const posts = await models.Post.findAll({
      include: [
        {
          model: models.User,
          as: "author",
          attributes: ["username", "gravatar", "bio"]
        },
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
        // console.log(like.userId);
        if (req.user) {
          if (like.userId === req.session.passport.user.id) {
            post.setDataValue("likedByMe", true);
          }
        } else if (like.userId === req.session.user.id) {
          post.setDataValue("likedByMe", true);
        }
      });
    });

    return res.json(posts);
  },
  
  postPage: async( req: any, res: Response) => {
    const postPage = await models.Post.findOne({
      where:{
        id: req.params.id;
      },
      include: [
        {
          model: models.User,
          as: "author",
          attributes: ["username", "gravatar", "bio"]
        },
        // limit the likes based on the logged in user
        {
          model: models.Likes
        }
      ],
    })
    return res.json(postPage);
  },
  createPost: async (req: any, res: Response) => {
    // console.log(getUser);
    let postData;

    if (req.user && req.user.id) {
      console.log(req.user.id);
      postData = {
        title: req.body.title,
        postContent: req.body.postContent,
        userId: req.session.passport.user.id
      };
    } else {
      postData = {
        title: req.body.title,
        postContent: req.body.postContent,
        userId: req.session.user.id
      };
    }

    await models.Post.create(postData)
      .then(post => {
        models.Post.findOne({
          where: {
            id: post.id
          },
          include: [
            {
              model: models.User,
              as: "author",
              attributes: ["username", "gravatar"]
            }
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
  deletePost: async (req:any, res:Response) => {
    try{
      await models.Post.destroy({
        where:{
          id: req.params.id
        }
      })
      return res.status(200).send('Post has been deleted!')  
      
    }catch(error){
      console.log("There was an error", error);
      res.status(401).send("Failed to delete");
    }

  },
  likePost: async (req: any, res: Response) => {
    // fetch created and post at the same time
    let currentUser;
    if (req.session.passport) {
      currentUser = req.session.passport.user.id;
    } else {
      currentUser = req.session.user.id;
    }
    const [created, post] = await Promise.all([
      models.Likes.findOne({
        where: {
          userId: currentUser,
          resourceId: req.params.id
        }
      }),
      models.Post.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: models.User,
            as: "author",
            attributes: ["username", "gravatar", "bio"]
          },
          // limit the likes based on the logged in user
          {
            model: models.Likes
          }
        ],
      }).then((newPost) => newPost)
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
      if (created && post) {
        return res.status(200).send({
          message: "You already liked this post"
        });
      }
      if (!created && post) {
        // use Promise.all() for concurrency
        await Promise.all([
          models.Likes.create(
            {
              userId: currentUser,
              resourceId: req.params.id
            },
            { transaction }
          ),
          post.increment("likeCounts", { by: 1, transaction }),
       
        ]);
        // find all likes, and if like === currentUser id, heart will be filled
        const likes = await models.Likes.findAll() 
        if (likes.length === 0) {
          console.log('this got called')
          post.setDataValue("likedByMe", true);
        } 
        if(likes){
          likes.forEach(like =>  {
            if(like.userId === currentUser){
              console.log('wwdff',like)
              post.setDataValue("likedByMe", true);
            } 
          })
        }
        await transaction.commit();

        return res.status(200).json({
          message: "You liked this post",
          post:post
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
    let currentUser;
    if (req.session.passport) {
      currentUser = req.session.passport.user.id;
    } else {
      currentUser = req.session.user.id;
    }
    const [created, post] = await Promise.all([
      models.Likes.findOne({
        where: {
          userId: currentUser,
          resourceId: req.params.id
        }
      }),
      models.Post.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: models.User,
            as: "author",
            attributes: ["username", "gravatar", "bio"]
          },
          // limit the likes based on the logged in user
          {
            model: models.Likes
          }
        ],
      })
    ]);
    // no post, no updates
    if (!post) {
      return res.status(401).json({
        message: "there is no post to be unliked"
      });
    }
    let transaction;
    try {
      transaction = await models.sequelize.transaction();
      if (created && post) {
        await Promise.all([
          models.Likes.destroy(
            {
              where: {
                userId: currentUser,
                resourceId: req.params.id
              }
            },
            { transaction }
          ),
          post.decrement("likeCounts", { by: 1, transaction }),  
        ]);
        const likes = await models.Likes.findAll()
        if(likes){
          likes.forEach(like =>  {
            console.log('dislike',like)
            if(like.userId === currentUser){
              post.setDataValue("likedByMe", false);
            } 
          })
        } 
        await transaction.commit();

        return res.status(200).json({
          message: "You unliked this post",
          post: post
        });
      }
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      console.log("There was an error", err);
      return res.status(500);
    }
  }
};
