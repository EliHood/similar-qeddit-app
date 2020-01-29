import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import models from "../models";
import sgTransport from 'nodemailer-sendgrid-transport'
dotenv.config();
const comparePassword = async (
  credentialsPassword: string,
  userPassword: string
) => {
  const isPasswordMatch = await bcrypt.compare(
    credentialsPassword,
    userPassword
  );
  return isPasswordMatch;
};

const auth = {
  auth: {
    api_user: `${process.env.SENDGRID_NAME}`,
    api_key: `${process.env.SENDGRID_PASSWORD}`,
  },
  // proxy: 'http://user:pass@localhost:3000' // optional proxy, default is false
}
 
const nodemailerMailgun = nodemailer.createTransport(sgTransport(auth));
 


export default {
  getUsers: async (req: any, res: Response) => {
   const users = await models.User.findAll({
      include:[
        {
          model: models.Followers,
          as: "UserFollowers",
          include:[
            {
              model: models.User,
              as: "followerDetails",
              attributes: ["username"]
            }
          ] 
        },
        {
          model: models.Following,
          as: "UserFollowings",
          include:[
            {
              model: models.User,
              as: "followingDetails",
              attributes: ["username"]
            }
          ]
        },         
      ],

    })
    users.forEach(user => {
      console.log('testtt', user.UserFollowers)

      if (user.UserFollowings.length && user.UserFollowers.length === 0) {
        user.setDataValue("isFollowing", false);
        console.log('fsfsfsfsfsfs')
      }
      if (user.UserFollowings.length && user.UserFollowers.length === 0) {
        user.setDataValue("isFollowing", false);
        console.log('fsfsfsfsfsfs')
      }
      else{ 
        user.UserFollowings.forEach(myUser => {
          if (myUser.following === req.session.user.id) {
            user.setDataValue("isFollowing", true);
          }
        });  
        user.UserFollowers.forEach(myUser => {
          if (myUser.followerId === req.session.user.id) {
            user.setDataValue("isFollowing", true);
          }
        });  
      }    
    });
    return res.json(users);
  },
  profile: async (req: Request, res: Response) => {
    let curUser;
    if (req.session && req.session.user) {
      curUser = req.session.user.id;
    } else if (req.session) {
      curUser = req.session.passport ? req.session.passport.user.id : null;
    }
    try{
    const username = req.params.username
    const findUser = await models.User.findOne({
      where: {
        username: username
      },
      include:[
        {
          model: models.Followers,
          as: "UserFollowers",
          include:[
            {
              model: models.User,
              as: "followerDetails",
              attributes: ["username"]
            }
          ] 
        },
        {
          model: models.Following,
          as: "UserFollowings"
        }
      ],   
    }) 
    // findUser.setDataValue("isFollowing", false)
    
    if(findUser){
      findUser.UserFollowers.forEach( (item) => {
        if(item.followerId === curUser){
          findUser.setDataValue("isFollowing", true);
        }
        else if(item.followerId === curUser){
          findUser.setDataValue("isFollowing", false);
        }  
      })
      return res.status(200).send(findUser);
    }else{
      return res.status(500).send({
        message: "User not found"
      })
    }
    } catch(err) {
        return res.status(500).send({
          message: "Something went wrong",
          err: err
        })
    }
  },
  editProfile: async (req: Request, res: Response) => {
    let curUser;
    if (req.session && req.session.user) {
      curUser = req.session.user.id;
    } else if (req.session) {
      curUser = req.session.passport ? req.session.passport.user.id : null;
    }
    const user = await models.User.findOne({
      where: {
        id: curUser
      },
      attributes: { exclude: ["password"], include: ["bio", "gravatar"] }
    });
    if (!user) {
      return res.status(401).send({
        message: "Profile err"
      });
    }
    return res.json(user);
  },

  updateProfile: async (req: Request, res: Response) => {
    const userData = req.body;
    let transaction;
    let curUser;
    if (req.session && req.session.user) {
      curUser = req.session.user.id;
    } else if (req.session) {
      curUser = req.session.passport ? req.session.passport.user.id : null;
    }
    try {
      transaction = await models.sequelize.transaction();
      return models.User.update(
        {
          bio: userData.bio,
          gravatar: userData.gravatar
        },
        {
          where: {
            id: curUser
          }
        },
        { transaction }
      ).then(async user => {
        console.log("sfsff", user);
        models.User.findOne({
          where: {
            id: curUser
          },
          attributes: ["gravatar", "bio"]
        }).then(async newBio => {
          console.log("anothfdf", newBio);
          await transaction.commit();
          return res.status(200).send({
            message: "Profile Updated Successfully",
            user: newBio
          });
        });
      });
    } catch (err) {
      await transaction.rollback();
      return res.status(500).send({
        message: "Something went wrong",
        error: err
      });
    }
  },
  signInUser: async (req: Request, res: Response) => {
    try {
      const credentials = req.body;
      const user = await models.User.findOne({
        where: {
          username: credentials.username
        },
        raw: true
      });

      /* user not registered */
      if (!user) {
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: `this account ${credentials.username} is not yet registered`
          }
        });
      }
      if(user.email_verified === false){
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: `Please activate your account to login`,
          }
        });
      }
      const isPasswordValid = await comparePassword(
        credentials.password,
        user.password
      );
      /* invalid password */
      if (!isPasswordValid) {
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: "invalid password"
          }
        });
      }

      /* save session */
      req.session.user = user;
      req.session.save(() => {});

      // set token and stuff
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        console.log(err, data);
      });
      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: "Sucessfully Authenticated",
          token
        },
        user
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },
  logOut: async (req: any, res: Response) => {
    try {
      req.session.destroy(() => {});
      req.logout();
      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },
  followUser: async (req: any, res:Response) => {
    let curUser;
    if (req.session && req.session.user) {
      curUser = req.session.user.id;
    } else if (req.session) {
      curUser = req.session.passport ? req.session.passport.user.id : null;
    }
    const { username } = req.params;
    try{
      const userToFollow = await models.User.findOne({
        where: { username: username }
      });
      if(userToFollow.id === curUser){
        return res.status(500).send({
            message: "You can't follow yourself"
        })
      }
      console.log('dsdsdd',userToFollow.id)
      await models.Following.create({
        following: userToFollow.id,
        userId: curUser
      })
      await models.Followers.create({
        followerId: curUser,
        userId: userToFollow.id
      }).then( (user) => {
        console.log('dsdsd',user)
         models.User.findOne({
           where:{
             id: userToFollow.id
           },
           include:[
            {
              model: models.Followers,
              as: "UserFollowers",
              include:[
                {
                  model: models.User,
                  as: "followerDetails",
                  attributes: ["username"]
                }
              ] 
            },
            {
              model: models.Following,
              as: "UserFollowings"
            }
          ]
         }).then( (follow) => {
          follow.setDataValue("isFollowing", true);
          return res.status(200).send({
            message: `You are now following ${userToFollow.username}`,
            follow: follow
          });
         })
      })
    } catch(err) {
      return res.status(500).send({
        message: "Something went wrong ",
        err
      })
    } 
  },
  unFollowUser: async (req: any, res: Response) => {
    let curUser;
    if (req.session && req.session.user) {
      curUser = req.session.user.id;
    } else if (req.session) {
      curUser = req.session.passport ? req.session.passport.user.id : null;
    }
    const { username } = req.params;
    try{
      const userToFollow = await models.User.findOne({
        where: { username: username }
      });
      if(userToFollow.id === curUser){
        return res.status(500).send({
          message: "You can't unfollow yourself"
        })
      }
      const isFollowed = await models.Following.findOne({
        where: { following: userToFollow.id}
      })
      // if(isFollowed){
      //   return res.status(200).send({
      //     message: "You already unfollowed this user"
      //   })
      // }

      await models.Following.destroy({
        where:{
          following: userToFollow.id,
          userId: curUser
        }
      })
      await models.Followers.destroy({
        where:{
          followerId: curUser,
          userId: userToFollow.id
        }
      }).then( (user) => {
        console.log('dsdsd',user)
         models.User.findOne({
           where:{
             id: curUser
           },
           include:[
            {
              model: models.Followers,
              as: "UserFollowers",
              include:[
                {
                  model: models.User,
                  as: "followerDetails",
                  attributes: ["username"]
                }
              ] 
            },
            {
              model: models.Following,
              as: "UserFollowings"
            }
          ]
         }).then( (follow) => {
          follow.setDataValue("isFollowing", false);
          console.log('fsfsfsfs',follow)
          return res.status(200).send({
            message: `You are unfollowing ${userToFollow.username}`,
            follow: follow
          });
         })
      });

    } catch(err) {
      return res.status(500).send({
        message: "Something went wrong ",
        err
      })
    } 

  },


  currentUser: (req: any, res: Response) => {
    let curUser;
    let token;
    /* save session */

    // console.log("currr", req.session.passport.user.id);

    if (req.session && req.session.user) {
      curUser = req.session.user
    } else if (req.session) {
      curUser = req.session.passport ? req.session.passport.user : null;
    }
    if (req.session && req.session.passport) {
      token = jwt.sign(
        { id: req.session.passport.user.id },
        process.env.JWT_SECRET
      );
    } else if (req.session && req.session.user) {
      token = jwt.sign({ id: req.session.user.id }, process.env.JWT_SECRET);
    }

    return res.status(200).send({
      user: curUser,
      token: token ? token : null
    });
  },
  resendEmailConfirmation: async (req: any, res: Response) => {
    try {  
      console.log('sdsfsffsf',req.session.user.email)
      const user = req.session.user
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const msg = {
        from: 'typescriptappexample@example.com',
        to: user.email,
        subject: 'Welcome to React TypeScript App',
        html: `<p>Click this to active your account <a href='${process.env.ALLOW_ORIGIN}/emailConfirmationSuccess/${user.id}/${token}'>${process.env.ALLOW_ORIGIN}/emailConfirmationSuccess/${user.id}/${token}</a></p>` // html body
      };
      console.log('sending mail')
      nodemailerMailgun.sendMail( msg, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
        }
      });

      return res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: `Email has been re-sent to ${user.email}, please activate your account`,
          token
        },
        user
      });
    }catch(err){

      return res.status(500).send({
        meta: {
          type: "err",
          status: 500,
          err: err,
          message: 'There has been an error resending confirmation email',
        }
      });
    }
   
  },
  emailConfirmationToken: async (req: any, res:Response) => {
    
    let token = req.params.token;
    console.log('testing',req.params)
    const user = await models.User.findOne({
      where:{
        id: req.params.userId,
      },
      raw: true
    })
    if(user.email_verified === true){
      return res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "You already activated your account"
        }  
      })
    } else {
    try {
      jwt.verify(token, process.env.JWT_SECRET, (err,result) =>{
        if(err){
          console.log(err)
          return res.status(500).send({
            meta: {
              type: "error",
              err:err,
              status: 500,
              message: "Invalid Token"
            }
          });  
        }
        else {
            models.User.findOne({
              where:{
                id: req.params.userId
              }
            }).then( (user) => {
              user.update({
                email_verified:true
              })
            }).then( () => {
              let decoded = jwt.decode(token,{complete:true});
              return res.status(200).send({
                message: "Thank you, account has been activated",
                user:{
                  token: decoded,
                  id: req.params.id,
                  result
                },
                decoded
              })
            }).catch( (err) => {
              return res.status(500).send({
                message: "Something went wrong",
                err
              })
            })
          }
        });
      } catch(err){
        console.log(err)
      }
    }
  },
  signUpUser: async (req: Request, res: Response) => {
    try {
      const credentials = req.body;
      console.log('test',credentials)
      if (!credentials.username || !credentials.email) {
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: "username and email are required"
          }
        });
      }

      const registeredEmail = await models.User.findOne({
        where: {
          email: credentials.email
        },
        raw: true
      });

      const registeredUserName = await models.User.findOne({
        where: {
          username: credentials.username
        },
        raw: true
      });

      /* email already registered */
      if (registeredEmail) {
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: `email: ${credentials.email ||
              credentials.username} is already registered`
          }
        });
      }
      if (registeredUserName) {
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: `username: ${credentials.username} is already registered`
          }
        });
      }

      return models.sequelize
        .transaction(t => {
          // chain all your queries here. make sure you return them.
          return bcrypt
            .hash(req.body.password, 12)
            .then((hashedPassword: string) => {
              return models.User.create(
                {
                  username: req.body.username,
                  password: hashedPassword,
                  email: req.body.email
                },
                { transaction: t }
              );
            });
        })
        .then(user => {
          req.session.user = user;
          req.session.save(() => {});
          console.log(user);
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          const msg = {
            from: 'typescriptappexample@example.com',
            to: req.body.email,
            subject: 'Welcome to React TypeScript App',
            html: `<p>Click this to active your account <a href='${process.env.ALLOW_ORIGIN}/emailConfirmationSuccess/${user.id}/${token}'>${process.env.ALLOW_ORIGIN}/emailConfirmationSuccess/${user.id}/${token}</a></p>` // html body
          };
          console.log('sending mail')
          nodemailerMailgun.sendMail( msg, (err, response) => {
            if (err) {
              console.error('there was an error: ', err);
            } else {
              console.log('here is the res: ', response);
            }
          });
          user.update({email_confirmation_token: token})
          return res.status(200).send({
            meta: {
              type: "success",
              status: 200,
              message: `Email has been sent to ${req.body.email}, please activate your account`,
              token
            },
            user
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({
            meta: {
              type: "error",
              status: 500,
              message: err.message.slice(18)
            }
          });
        });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};
