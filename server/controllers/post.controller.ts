import dotenv from "dotenv";
import e, { Request, Response } from "express";
import sequelize from "sequelize";
import models from "../models";
import { NotificationServ } from "../sockets";
import pusherConfig from "./../sockets/pusherConfig";
import { profanity } from "@2toad/profanity";
import post from "../models/post";

const Op = sequelize.Op;

dotenv.config();
const filterbadWords = (word: string) => {
  let arr;
  let content;
  if (profanity.censor(word)) {
    arr = [];
    const sentence = word.split(" ");
    for (let str in sentence) {
      const newWord = sentence[str].split(" ").join("");
      console.log("newWord", newWord);
      const filteredWord = profanity.censor(newWord);
      arr.push(newWord.charAt(0) + filteredWord.substring(1));
      content = arr.join(" ");
    }
    return content;
  } else {
    return word;
  }
};

const isUser = (req: any): String => {
  var curUser: String;
  if (req.session && req.session.user) {
    return (curUser = req.session.user.id);
  } else {
    return (curUser = req.session.passport
      ? req.session.passport.user.id
      : null);
  }
};

export default {
  getPosts: async (req: any, res: Response) => {
    // use async/await here

    const posts = await models.Post.findAll({
      include: [
        {
          model: models.User,
          as: "author",
          attributes: ["username", "gravatar", "bio"],
        },
        {
          model: models.Likes,
        },
        {
          model: models.Comments,
          include: [
            {
              model: models.CommentReplies,
              as: "commentReplies",
              include: [
                {
                  model: models.User,
                  as: "author",
                  attributes: ["username", "gravatar", "bio"],
                },
              ],
            },
            {
              model: models.User,
              as: "author",
              attributes: ["username", "gravatar", "bio"],
            },
          ],
        },
        {
          model: models.RePosts,
          include: [
            {
              model: models.User,
              as: "author",
              attributes: ["username", "gravatar", "bio"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 6,
    });
    let currentUser;
    currentUser = req.session && req.session.user ? req.session.user.id : 0;

    posts.forEach((post) => {
      if (post.Likes.length === 0) {
        post.setDataValue("likedByMe", false);
      }
      if (post.RePosts.length === 0) {
        post.setDataValue("RepostedByMe", false);
      }
      post.RePosts.forEach((repost) => {
        const googleLogin = req.session.passport;
        if (typeof googleLogin === "object") {
          if (repost.userId === googleLogin.user.id) {
            post.setDataValue("RepostedByMe", true);
          }
        }

        if (typeof req.session.user === "undefined") {
          if (
            typeof googleLogin === "undefined" &&
            typeof req.session.user === "undefined"
          ) {
            post.setDataValue("RepostedByMe", false);
          }
        } else if (typeof req.session.user === "object") {
          if (repost.userId === req.session.user.id) {
            post.setDataValue("RepostedByMe", true);
          }
        }
      });
      post.Likes.forEach((like) => {
        // console.log(like.userId);
        if (req.user) {
          if (like.userId === req.session.passport.user.id) {
            post.setDataValue("likedByMe", true);
          }
        } else if (like.userId === currentUser) {
          post.setDataValue("likedByMe", true);
        }
        // else if(like.userId !== currentUser) {
        //   post.setDataValue("likedByMe", false);
        // }
      });
    });

    return res.json(posts);
  },

  postPage: async (req: any, res: Response) => {
    const postPage = await models.Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: models.User,
          as: "author",
          attributes: ["username", "gravatar", "bio"],
        },
        // limit the likes based on the logged in user
        {
          model: models.Likes,
        },
      ],
    });
    return res.json(postPage);
  },
  rePost: async (req: any, res: Response) => {
    console.log("post", req.params.postId, req.params.userId);
    try {
      const postId = req.params.postId;
      const created = await models.RePosts.findOne({
        where: {
          userId: req.params.userId,
          postId: postId,
        },
      });

      if (!created) {
        return models.RePosts.create({
          userId: req.params.userId,
          postId: postId,
        }).then((post) => {
          res.status(200).send({
            message: "Post Reposted",
            post: post,
          });
        });
      } else {
        return res.status(401).send({
          message: "Already Reposted",
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Failed to repost",
      });
    }
  },
  unRePost: async (req: any, res: Response) => {
    try {
      const postId = req.params.postId;
      const created = await models.RePosts.findOne({
        where: {
          userId: req.params.userId,
          postId: postId,
        },
      });
      if (created) {
        return models.RePosts.destroy({
          where: {
            userId: req.params.userId,
            postId: postId,
          },
        }).then((repost) => {
          res.status(200).send({
            message: "Post got unposted",
            repost: repost,
            postId: parseInt(postId),
          });
        });
      } else {
        res.status(401).send({
          message: "Already got UnReposted",
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Failed to un-repost",
      });
    }
  },
  deleteComment: async (req: any, res: Response) => {
    const currentUser = isUser(req);
    if (req.params.userId == currentUser) {
      try {
        await models.Comments.destroy({
          where: {
            id: req.params.id,
          },
        });
        return res.status(200).send("Comment has been deleted!");
      } catch (error) {
        console.log("There was an error", error);
        res.status(401).send("Failed to delete comment");
      }
    } else {
      return res.status(500).send("You can't delete another user comment");
    }
  },
  createPost: async (req: any, res: Response) => {
    // console.log(getUser);
    let postData;

    console.log("ssd");
    if (req.user && req.user.id) {
      console.log(req.user.id);
      postData = {
        title: filterbadWords(req.body.ourTitle),
        postContent: filterbadWords(req.body.ourPostContent),
        userId: req.session.passport.user.id,
      };
    } else {
      postData = {
        title: filterbadWords(req.body.ourTitle),
        postContent: filterbadWords(req.body.ourPostContent),
        userId: req.session.user.id,
      };
    }

    console.log("dsdsdsdsdsdsdsdsdds", postData);

    await models.Post.create(postData)
      .then((post) => {
        models.Post.findOne({
          where: {
            id: post.id,
          },
          include: [
            {
              model: models.User,
              as: "author",
              attributes: ["username", "gravatar"],
            },
            {
              model: models.Comments,
              include: [
                {
                  model: models.User,
                  as: "author",
                  attributes: ["username", "gravatar", "bio"],
                },
              ],
            },
          ],
        }).then((newPost) => {
          newPost.setDataValue("likedByMe", false);
          return res.status(200).send({
            message: "post created",
            post: newPost,
          });
        });
      })
      .catch((err) => {
        return res.status(401).send({
          message: `Something went wrong`,
          error: err,
        });
      });
    console.log(req.body);
  },
  postComment: async (req: any, res: Response) => {
    const currentUser = isUser(req);
    try {
      const postData = {
        comment_body: filterbadWords(req.body.comment_body),
        userId: currentUser,
        postId: req.body.id,
        gifUrl: req.body.gifUrl,
      };
      console.log("dfffcheck", postData);
      const users = await models.User.findAll();
      const usernames = users.map((item) => item.username);

      await models.Comments.create(postData).then((comment) => {
        console.log("this is the comment", comment);
        models.Comments.findOne({
          where: {
            id: comment.id,
          },
          include: [
            {
              model: models.User,
              as: "author",
              attributes: ["username", "gravatar"],
            },
            {
              model: models.CommentReplies,
              as: "commentReplies",
              include: [
                {
                  model: models.User,
                  as: "author",
                  attributes: ["username", "gravatar", "bio"],
                },
              ],
            },
          ],
        }).then(async (newComment) => {
          if (usernames.some((user) => req.body.comment_body.includes(user))) {
            // will trigger mention notification if user is mentioned
            const username = usernames.find((user) =>
              req.body.comment_body.includes(user)
            );
            console.log("this got called");
            NotificationServ.userMention(
              currentUser,
              newComment.postId,
              username,
              newComment.userId
            );
            pusherConfig.trigger("post-comments", "user-mention", {
              comment: newComment,
            });
          } else {
            console.log("no luck finding user");
          }
          console.log("dsdsdssdsd", currentUser, newComment.userId); // con

          NotificationServ.newCommentNotification(
            currentUser,
            newComment.postId,
            newComment.userId
          );

          pusherConfig.trigger("post-comments", "new-comment", {
            comment: newComment,
          });
          return res.status(200).send({
            message: "comment created",
            comment: newComment,
          });
        });
      });
    } catch (error) {
      console.log("There was an error", error);
      return res.status(500).send({
        message: "Failed to write a comment",
        error,
      });
    }
  },
  editComment: async (req: any, res: Response) => {
    let transaction;
    console.log("testtttt", req.body);
    const currentUser = isUser(req);
    if (req.body.comment_body && req.body.gifUrl) {
      return res.status(401).send({
        message: "Can't edit both",
      });
    }
    console.log("dfdfdfd", req.params.userId, currentUser);
    if (req.params.userId != currentUser) {
      return res.status(401).send({
        message: "Can't edit another users post",
      });
    } else {
      try {
        transaction = await models.sequelize.transaction();
        return models.Comments.update(
          {
            comment_body: filterbadWords(req.body.commentData)
              ? filterbadWords(req.body.commentData)
              : "",
            gifUrl: req.body.gifUrl ? req.body.gifUrl : "",
          },
          {
            where: {
              id: req.params.commentId,
            },
          },
          { transaction }
        ).then(async (comment) => {
          console.log("anothfdf", comment);
          await transaction.commit();
          return res.status(200).send({
            message: "Comment Edited Successfully",
          });
        });
      } catch (err) {
        console.log("something went wrong", err);
        res.status(401).send({
          message: "Something went wrong",
        });
      }
    }
  },
  searchPosts: async (req: any, res: Response) => {
    if (req.params.searchQuery === "") {
      return res.status(401).send({
        message: "No Posts found",
      });
    }
    try {
      const posts = await models.Post.findAll({
        where: {
          title: {
            [Op.like]: "%" + req.params.searchQuery + "%",
          },
        },
        include: [
          {
            model: models.User,
            as: "author",
            attributes: ["username", "gravatar", "bio"],
          },
          {
            model: models.Likes,
          },
          {
            model: models.Comments,
            include: [
              {
                model: models.CommentReplies,
                as: "commentReplies",
                include: [
                  {
                    model: models.User,
                    as: "author",
                    attributes: ["username", "gravatar", "bio"],
                  },
                ],
              },
              {
                model: models.User,
                as: "author",
                attributes: ["username", "gravatar", "bio"],
              },
            ],
          },
          {
            model: models.RePosts,
            include: [
              {
                model: models.User,
                as: "author",
                attributes: ["username", "gravatar", "bio"],
              },
            ],
          },
        ],
      });
      let currentUser;
      currentUser = req.session && req.session.user ? req.session.user.id : 0;

      posts.forEach((post) => {
        if (post.Likes.length === 0) {
          post.setDataValue("likedByMe", false);
        }
        if (post.RePosts.length === 0) {
          post.setDataValue("RepostedByMe", false);
        }
        post.RePosts.forEach((repost) => {
          const googleLogin = req.session.passport;
          if (typeof googleLogin === "object") {
            if (repost.userId === googleLogin.user.id) {
              post.setDataValue("RepostedByMe", true);
            }
          }

          if (typeof req.session.user === "undefined") {
            if (
              typeof googleLogin === "undefined" &&
              typeof req.session.user === "undefined"
            ) {
              post.setDataValue("RepostedByMe", false);
            }
          } else if (typeof req.session.user === "object") {
            if (repost.userId === req.session.user.id) {
              post.setDataValue("RepostedByMe", true);
            }
          }
        });
        post.Likes.forEach((like) => {
          // console.log(like.userId);
          if (req.user) {
            if (like.userId === req.session.passport.user.id) {
              post.setDataValue("likedByMe", true);
            }
          } else if (like.userId === currentUser) {
            post.setDataValue("likedByMe", true);
          }
          // else if(like.userId !== currentUser) {
          //   post.setDataValue("likedByMe", false);
          // }
        });
      });
      if (posts.length === 0) {
        res.status(401).send({
          message: "No Posts Found",
        });
      } else {
        res.status(200).send({
          post: posts,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).send("Failed to get posts");
    }
  },
  deleteReply: async (req: any, res: Response) => {
    try {
      await models.CommentReplies.destroy({
        where: {
          id: req.params.id,
          postId: req.params.postId,
        },
      });
      return res.status(200).send({
        message: "Reply has been deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(401).send("Failed to delete reply");
    }
  },
  replyComment: async (req: any, res: Response) => {
    const currentUser = isUser(req);
    console.log("dsfsfsf checking for reqboyd", req.body);
    try {
      await models.CommentReplies.create({
        postId: req.params.postId,
        commentId: req.params.commentId,
        userId: currentUser,
        replyBody: req.body.replyBody,
      }).then((reply) => {
        models.CommentReplies.findOne({
          where: {
            id: reply.id,
          },
          include: [
            {
              model: models.User,
              as: "author",
              attributes: ["username", "gravatar"],
            },
          ],
        }).then((newReply) => {
          return res.status(200).send({
            reply: newReply,
            message: "Reply added successfully",
          });
        });
      });
    } catch (err) {
      res.status(401).send("Failed to add reply");
    }
  },
  deletePost: async (req: any, res: Response) => {
    const currentUser = isUser(req);
    console.log(req.params);
    if (req.params.userId == currentUser) {
      try {
        await models.Post.destroy({
          where: {
            id: req.params.id,
          },
        });
        return res.status(200).send("Post has been deleted!");
      } catch (error) {
        console.log("There was an error", error);
        res.status(401).send("Failed to delete");
      }
    } else {
      return res.status(500).send("You can't delete another user post");
    }
  },
  likePost: async (req: any, res: Response) => {
    // fetch created and post at the same time
    const currentUser = isUser(req);
    const created = await models.Likes.findOne({
      where: {
        userId: currentUser,
        resourceId: req.params.id,
      },
    });
    const post = await models.Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: models.User,
          as: "author",
          attributes: ["username", "gravatar", "bio"],
        },
        // limit the likes based on the logged in user
        {
          model: models.Likes,
        },
      ],
    })
      .then((newPost) => newPost)
      .catch((err) =>
        res.status(500).send({
          message: err,
        })
      );

    // const [created, post] = await Promise.all([
    //   models.Likes.findOne({
    //     where: {
    //       userId: currentUser,
    //       resourceId: req.params.id
    //     }
    //   }),
    //   models.Post.findOne({
    //     where: {
    //       id: req.params.id
    //     },
    //     include: [
    //       {
    //         model: models.User,
    //         as: "author",
    //         attributes: ["username", "gravatar", "bio"]
    //       },
    //       // limit the likes based on the logged in user
    //       {
    //         model: models.Likes
    //       }
    //     ],
    //   }).then((newPost) => newPost).catch( (err) => res.status(500).send({
    //     message:err,
    //   }))
    // ]);

    // no post, no updates
    if (!post) {
      return res.status(200).send({
        message: "there is no post to be liked",
      });
    }

    // we are going to make updates, so use a transaction, you will need to reference sequelize
    let transaction;
    try {
      transaction = await models.sequelize.transaction();
      if (created && post) {
        return res.status(500).send({
          message: "Something went wrong, please refresh",
        });
      }
      if (!created && post) {
        // use Promise.all() for concurrency
        await models.Likes.create(
          {
            userId: currentUser,
            resourceId: req.params.id,
          },
          { transaction }
        );
        post.increment("likeCounts", { by: 1, transaction });

        // find all likes, and if like === currentUser id, heart will be filled
        const likes = await models.Likes.findAll();
        if (likes.length === 0) {
          console.log("this got called");
          post.setDataValue("likedByMe", true);
        }
        if (likes) {
          likes.forEach((like) => {
            if (like.userId === currentUser) {
              console.log("wwdff", like);
              post.setDataValue("likedByMe", true);
            }
          });
        }
        await transaction.commit();

        return res.status(200).json({
          message: "You liked this post",
          post,
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
    const currentUser = isUser(req);
    const created = await models.Likes.findOne({
      where: {
        userId: currentUser,
        resourceId: req.params.id,
      },
    });
    const post = await models.Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: models.User,
          as: "author",
          attributes: ["username", "gravatar", "bio"],
        },
        // limit the likes based on the logged in user
        {
          model: models.Likes,
        },
      ],
    });
    // const [created, post] = await Promise.all([
    //   models.Likes.findOne({
    //     where: {
    //       userId: currentUser,
    //       resourceId: req.params.id
    //     }
    //   }),
    //   models.Post.findOne({
    //     where: {
    //       id: req.params.id
    //     },
    //     include: [
    //       {
    //         model: models.User,
    //         as: "author",
    //         attributes: ["username", "gravatar", "bio"]
    //       },
    //       // limit the likes based on the logged in user
    //       {
    //         model: models.Likes
    //       }
    //     ],
    //   })
    // ]);
    // no post, no updates
    if (!post) {
      return res.status(401).json({
        message: "there is no post to be unliked",
      });
    }
    let transaction;
    try {
      transaction = await models.sequelize.transaction();
      if (!created && post) {
        return res.status(500).send({
          message: "Something went wrong, please refresh",
        });
      }
      if (created && post) {
        await models.Likes.destroy(
          {
            where: {
              userId: currentUser,
              resourceId: req.params.id,
            },
          },
          { transaction }
        );
        post.decrement("likeCounts", { by: 1, transaction });
        const likes = await models.Likes.findAll();
        if (likes) {
          likes.forEach((like) => {
            console.log("dislike", like);
            if (like.userId === currentUser) {
              post.setDataValue("likedByMe", false);
            }
          });
        }
        await transaction.commit();

        return res.status(200).json({
          message: "You unliked this post",
          post,
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
};
