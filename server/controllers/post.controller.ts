import dotenv from "dotenv";
import { Request, Response } from "express";
import sequelize from "sequelize";
import models from "../models";
import { NotificationServ } from '../sockets';
import pusherConfig from "./../sockets/pusherConfig";
import { profanity } from '@2toad/profanity';

dotenv.config();
const filterbadWords = (word:string) => {
  let arr;
  let content
  if(profanity.censor(word)) {
    arr = []
    const sentence = word.split(' ')
    for(let str in sentence){
      const newWord = sentence[str].split(' ').join('');
      console.log('newWord', newWord)
      const filteredWord = profanity.censor(newWord)
      arr.push(newWord.charAt(0) + filteredWord.substring(1))
      content =  arr.join(' ')
    }
    return content
  } else{
    return word
  }

}
export default {
  getPosts: async (req: any, res: Response) => {
    // use async/await here
    
    const posts = await models.Post.cache('all-posts').findAll({
      include: [
        {
          model: models.User,
          as: "author",
          attributes: ["username", "gravatar", "bio"]
        },
        {
          model: models.Likes,
          
        },
        {
          model: models.Comments,
          include:[
            {
              model: models.User,
              as: "author",
              attributes: ["username", "gravatar", "bio"]
            }
           
          ],
        }
      ],
      order: [["createdAt", "DESC"]],
      limit: 6
    });
    let currentUser;
    currentUser = req.session && req.session.user ? req.session.user.id : 0
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
          model: models.Likes,
          
        },
      ],
    })
    return res.json(postPage);
  },
  deleteComment: async (req: any, res: Response) => {
    let currentUser;
    if (req.session.passport) {
      currentUser = req.session.passport.user.id;
    } else {
      currentUser = req.session.user.id;
    }
    if(req.params.userId == currentUser){
      try{
        await models.Comments.destroy({
          where:{
            id: req.params.id
          }
        })
        return res.status(200).send('Comment has been deleted!')  
        
      }catch(error){
        console.log("There was an error", error);
        res.status(401).send("Failed to delete comment");
      }
    }else{
      return res.status(500).send("You can't delete another user comment");
    }
  
  },
  createPost: async (req: any, res: Response) => {
    // console.log(getUser);
    let postData;

    console.log('ssd')
    if (req.user && req.user.id) {
      console.log(req.user.id);
      postData = {
        title: filterbadWords(req.body.ourTitle),
        postContent: filterbadWords(req.body.ourPostContent),
        userId: req.session.passport.user.id
      };
    } else {
      postData = {
        title: filterbadWords(req.body.ourTitle),
        postContent: filterbadWords(req.body.ourPostContent),
        userId: req.session.user.id
      };
    }

    console.log('dsdsdsdsdsdsdsdsdds',postData)

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
            },
            {
              model: models.Comments,
              include:[
                {
                  model: models.User,
                  as: "author",
                  attributes: ["username", "gravatar", "bio"]
                }
               
              ]   
            }
          ],
          
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
  postComment: async (req: any, res: Response) => {
    let currentUser;
    let content;
    let arr;

    if (req.session.passport) {
      currentUser = req.session.passport.user.id;
    } else {
      currentUser = req.session.user.id;
    }

    try{
      const postData = {
        comment_body: filterbadWords(req.body.comment_body),
        userId: currentUser,
        postId: req.body.id,
        gifUrl: req.body.gifUrl
      };
      console.log('dfffcheck',postData)
     await models.Comments.create(postData)
        .then((comment) => {
          console.log('this is the comment',comment)
          models.Comments.findOne({
            where: {
              id: comment.id
            },
            include: [
              {
                model: models.User,
                as: "author",
                attributes: ["username", "gravatar"]
              }
            ]         
          }).then(async newComment => {
           console.log('dsdsdssdsd',newComment.postId, newComment.userId) // con
            NotificationServ.newCommentNotification(newComment.postId, newComment.userId);
            pusherConfig.trigger('post-comments', 'new-comment', { comment: newComment });
            return res.status(200).send({
              message: "comment created",
              comment: newComment
            });
          
          })
      })
    } catch(error){
      console.log("There was an error", error);
      return res.status(500).send({
        message: "Failed to write a comment", 
        error 
      });
    }

  },
  editComment: async(req:any, res: Response) => {
    let currentUser;
    let transaction;
    console.log('testtttt',req.body)
    if (req.session.passport) {
      currentUser = req.session.passport.user.id;
    } else {
      currentUser = req.session.user.id;
    } 
    if(req.body.comment_body && req.body.gifUrl){
      return res.status(401).send({
        message: "Can\'t edit both"
      })
    }
    console.log('dfdfdfd',req.params.userId, currentUser)
    if(req.params.userId != currentUser){
      return res.status(401).send({
        message: "Can\'t edit another users post"
      });
    } else{
      try{
        transaction = await models.sequelize.transaction();
        return models.Comments.update({
          comment_body:  filterbadWords(req.body.commentData) ?  filterbadWords(req.body.commentData) : "",
          gifUrl: req.body.gifUrl ? req.body.gifUrl : ""
        },{
          where: {
            id: req.params.commentId,
          },
        },
        { transaction }).then(async(comment) => {
          console.log("anothfdf", comment);
          await transaction.commit();
          return res.status(200).send({
            message: "Comment Edited Successfully",
          });
        })
     } catch(err){
       console.log("something went wrong", err);
       res.status(401).send({
         message:"Something went wrong"
       })
     }  
    }
   
  },
  deletePost: async (req:any, res:Response) => {
    let currentUser;
    if (req.session.passport) {
      currentUser = req.session.passport.user.id;
    } else {
      currentUser = req.session.user.id;
    }
    console.log(req.params)
    if(req.params.userId == currentUser){ 
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
    }else{
      return res.status(500).send("You can't delete another user post");
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
        return res.status(500).send({
          message: "Something went wrong, please refresh" 
        });
      }
      if (!created && post) {
        // use Promise.all() for concurrency
        await Promise.all([
          models.Likes.cache().create(
            {
              userId: currentUser,
              resourceId: req.params.id
            },
            { transaction }
          ),
          post.increment("likeCounts", { by: 1, transaction }),
       
        ]);
        // find all likes, and if like === currentUser id, heart will be filled
        const likes =  await models.Likes.cache('allLikes').findAll()
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
          post
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
      if (!created && post) {
        return res.status(500).send({
          message: "Something went wrong, please refresh" 
        });
      }
      if (created && post) {
        await Promise.all([
          models.Likes.cache().destroy(
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
        const likes = await models.Likes.cache('allLikes').findAll()
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
          post
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
