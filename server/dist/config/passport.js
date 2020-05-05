"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const models_1 = __importDefault(require("../models"));
dotenv_1.default.config();
const GoogleSta = passport_google_oauth20_1.default.Strategy;
passport_1.default.serializeUser((user, done) => {
    return done(null, user);
});
passport_1.default.deserializeUser((id, done) => {
    console.log(id);
    models_1.default.User.findOne({ id })
        .then((usr) => {
        return done(null, usr);
    })
        .catch((err) => {
        done(err);
    });
});
passport_1.default.use(new GoogleSta({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    passReqToCallback: true,
}, (req, token, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(profile);
    models_1.default.User.findOne({ where: { googleId: profile.id } }).then((userExist) => __awaiter(void 0, void 0, void 0, function* () {
        let transaction;
        if (userExist) {
            console.log("passport hi");
            return done(null, userExist);
        }
        else {
            try {
                console.log("test", profile);
                return models_1.default.User.create({
                    googleId: profile.id,
                    username: profile.displayName
                        ? profile.displayName
                        : profile.emails[0].value,
                    gravatar: profile.photos[0].value,
                    email: profile.emails[0].value,
                }).then((user) => {
                    // req.user = user;
                    // req.session.user = user; // refresh the session valu
                    return done(null, user);
                });
            }
            catch (err) {
                return done(null, err);
            }
        }
    }));
})));
//# sourceMappingURL=passport.js.map