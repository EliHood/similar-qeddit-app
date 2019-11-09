import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import models from "../models";
import dotenv from "dotenv";
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

export default {
  getUsers: async (req: Request, res: Response) => {
    await models.User.findAll().then((users: any) => {
      res.json(users);
    });
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
          token: token
        },
        user: user
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
  logOut: async (req: Request, res: Response) => {
    try {
      req.session.destroy(() => {});
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
  tryAutoSignInUser: async (req: any, res: Response) => {
    try {
      const currentUserId = req.session.user.id;
      console.log(currentUserId);
      console.log(currentUserId);
      const user = await models.User.findOne({
        where: { id: currentUserId },
        raw: true
      });

      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        user: user
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
  signUpUser: async (req: Request, res: Response) => {
    try {
      const credentials = req.body;
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
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
          return res.status(200).send({
            meta: {
              type: "success",
              status: 200,
              message: "",
              token: token
            },
            user: user
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
