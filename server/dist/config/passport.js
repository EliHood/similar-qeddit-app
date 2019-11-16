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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = __importDefault(require("../models"));
dotenv_1.default.config();
const GoogleSta = passport_google_oauth20_1.default.Strategy;
passport_1.default.use(new GoogleSta({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:5000/api/v1/users/auth/google/callback"
}, (token, tokenSecret, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(profile);
    models_1.default.User.findOrCreate({ where: { googleId: profile.id } }).then((err) => __awaiter(void 0, void 0, void 0, function* () {
        if (profile) {
            console.log("test", profile.emails[0].value);
            return done(null, profile);
        }
        else {
            let transaction;
            try {
                transaction = yield models_1.default.sequelize.transaction();
                yield Promise.all([
                    models_1.default.User.create({
                        googleId: profile.id,
                        email: profile.emails[0].value
                    }, { transaction })
                ]).then((user) => __awaiter(void 0, void 0, void 0, function* () {
                    yield transaction.commit();
                    return done(null, user);
                }));
            }
            catch (err) {
                if (transaction) {
                    yield transaction.rollback();
                    return done(null, err);
                }
            }
        }
    }));
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((user, done) => {
    models_1.default.User.findOne({ id: user })
        .then(usr => {
        done(null, usr);
    })
        .catch(err => {
        done(err);
    });
});
//# sourceMappingURL=passport.js.map