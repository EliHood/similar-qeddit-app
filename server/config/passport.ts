import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
import models from "../models";
dotenv.config();
const GoogleSta = GoogleStrategy.Strategy;

passport.use(
  new GoogleSta(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "http://localhost:5000/api/v1/users/auth/google/callback"
    },
    async (token, tokenSecret, profile, done) => {
      console.log(profile);
      models.User.findOne({ where: { googleId: profile.id } }).then(
        async userExist => {
          let transaction;
          if (userExist) {
            console.log("hi");
            return done(null, userExist);
          } else {
            try {
              transaction = await models.sequelize.transaction();
              console.log("test", profile.emails[0].value);
              await Promise.all([
                models.User.create(
                  {
                    googleId: profile.id,
                    username: null,
                    email: profile.emails[0].value
                  },
                  { transaction }
                )
              ]).then(async user => {
                await transaction.commit();
                return done(null, user);
              });
            } catch (err) {
              if (transaction) {
                await transaction.rollback();
                return done(null, err);
              }
            }
          }
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log(user);
  models.User.findOne({ id: user })
    .then(usr => {
      done(null, usr);
    })
    .catch(err => {
      done(err);
    });
});
