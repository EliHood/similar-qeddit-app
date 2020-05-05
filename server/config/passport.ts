import dotenv from "dotenv";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import models from "../models";
dotenv.config();
const GoogleSta = GoogleStrategy.Strategy;

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  models.User.findOne({ id })
    .then((usr) => {
      return done(null, usr);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(
  new GoogleSta(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL,
      passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    async (req, token, refreshToken, profile, done) => {
      console.log(profile);
      models.User.findOne({ where: { googleId: profile.id } }).then(
        async (userExist) => {
          let transaction;
          if (userExist) {
            console.log("passport hi");
            return done(null, userExist);
          } else {
            try {
              // transaction = await models.sequelize.transaction();

              console.log("test", profile);

              return models.User.create({
                googleId: profile.id,
                username: profile.displayName
                  ? profile.displayName
                  : profile.emails[0].value,
                gravatar: profile.photos[0].value,
                email: profile.emails[0].value,
              }).then((user) => {
                req.user = user;
                req.session.user = user; // refresh the session value
                console.log("checking passport", req.session.user);
                return done(null, user);
              });
            } catch (err) {
              return done(null, err);
            }
          }
        }
      );
    }
  )
);
