import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import models from "../models";
import mg from 'nodemailer-mailgun-transport';

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
    api_key: `${process.env.API_KEY}`,
    domain: `${process.env.DOMAIN}`,
  },
  // proxy: 'http://user:pass@localhost:3000' // optional proxy, default is false
}
 
const nodemailerMailgun = nodemailer.createTransport(mg(auth));
 


export default {
  getUsers: async (req: Request, res: Response) => {
    await models.User.findAll().then((users: any) => {
      res.json(users);
    });
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
  emailConfirmationToken: async (req: any, res:Response) => {
    let token = req.params.token;
    console.log('testing',req.params)
    const user = await models.User.findOne({
      where:{
        id: req.params.userId,
      },
      raw: true
    })

    jwt.verify(token, process.env.JWT_SECRET, (err,result) =>{
      if(user.email_verified === true){
        return res.status(500).send({
          meta: {
            type: "error",
            status: 500,
            message: "You already activated your account"
          }  
        })
      } 
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
