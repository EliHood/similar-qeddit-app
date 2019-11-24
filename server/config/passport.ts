import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
import models from "../models";
dotenv.config();
const GoogleSta = GoogleStrategy.Strategy;

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  models.User.findOne({ id: id })
    .then(usr => {
      return done(null, usr);
    })
    .catch(err => {
      done(err);
    });
});

passport.use(
  new GoogleSta(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL
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

              console.log("test", profile.photos[0].value);
              await Promise.all([
                models.User.create(
                  {
                    googleId: profile.id,
                    username: null,
                    gravatar: profile.photos[0].value,
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
