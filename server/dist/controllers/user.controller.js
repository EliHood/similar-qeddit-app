"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendgrid_transport_1 = __importDefault(require("nodemailer-sendgrid-transport"));
const models_1 = __importDefault(require("../models"));
dotenv_1.default.config();
const comparePassword = (credentialsPassword, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isPasswordMatch = yield bcrypt.compare(credentialsPassword, userPassword);
    return isPasswordMatch;
});
const isUser = (req) => {
    var curUser;
    if (req.session && req.session.user) {
        return (curUser = req.session.user.id);
    }
    else {
        return (curUser = req.session.passport
            ? req.session.passport.user.id
            : null);
    }
};
const auth = {
    auth: {
        api_user: `${process.env.SENDGRID_NAME}`,
        api_key: `${process.env.SENDGRID_PASSWORD}`,
    },
};
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.default.User.findOne({
        where: {
            username: username,
        },
        raw: true,
    });
    console.log("fdfdfdfdf", user);
    return user;
});
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.default.User.findOne({
        where: {
            email: email,
        },
        raw: true,
    });
    return user;
});
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.default.User.findOne({
        where: {
            id: id,
        },
        raw: true,
    });
    return user;
});
const findUserProfile = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.default.User.findOne({
        where: {
            username,
        },
        include: [
            {
                model: models_1.default.Followers,
                as: "UserFollowers",
                include: [
                    {
                        model: models_1.default.User,
                        as: "followerDetails",
                        attributes: ["username"],
                    },
                ],
            },
            {
                model: models_1.default.Following,
                as: "UserFollowings",
            },
        ],
    });
    return user;
});
const nodemailerMailgun = nodemailer_1.default.createTransport(nodemailer_sendgrid_transport_1.default(auth));
exports.default = {
    getUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield models_1.default.User.findAll({
            include: [
                {
                    model: models_1.default.Followers,
                    as: "UserFollowers",
                    include: [
                        {
                            model: models_1.default.User,
                            as: "followerDetails",
                            attributes: ["username"],
                        },
                    ],
                },
                {
                    model: models_1.default.Following,
                    as: "UserFollowings",
                    include: [
                        {
                            model: models_1.default.User,
                            as: "followingDetails",
                            attributes: ["username"],
                        },
                    ],
                },
            ],
        });
        users.forEach((user) => {
            console.log("testt", user.UserFollowers);
            if (user.UserFollowings.length && user.UserFollowers.length === 0) {
                user.setDataValue("isFollowing", false);
                console.log("fsfsfsfsfsfs");
            }
            if (user.UserFollowings.length && user.UserFollowers.length === 0) {
                user.setDataValue("isFollowing", false);
                console.log("fsfsfsfsfsfs");
            }
            else {
                user.UserFollowings.forEach((myUser) => {
                    if (myUser.following === req.session.user.id) {
                        user.setDataValue("isFollowing", true);
                    }
                });
                user.UserFollowers.forEach((myUser) => {
                    if (myUser.followerId === req.session.user.id) {
                        user.setDataValue("isFollowing", true);
                    }
                });
            }
        });
        return res.json(users);
    }),
    profile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log("sfsfsfs", isUser(req));
        try {
            const username = req.params.username;
            const findUser = yield findUserProfile(username);
            // findUser.setDataValue("isFollowing", false)
            if (findUser) {
                findUser.UserFollowers.forEach((item) => {
                    if (item.followerId === isUser(req)) {
                        findUser.setDataValue("isFollowing", true);
                    }
                    else if (item.followerId === isUser(req)) {
                        findUser.setDataValue("isFollowing", false);
                    }
                });
                return res.status(200).send(findUser);
            }
            else {
                return res.status(500).send({
                    message: "User not found",
                });
            }
        }
        catch (err) {
            return res.status(500).send({
                message: "Something went wrong",
                err,
            });
        }
    }),
    editProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models_1.default.User.findOne({
            where: {
                id: isUser(req),
            },
            attributes: { exclude: ["password"], include: ["bio", "gravatar"] },
        });
        if (!user) {
            return res.status(401).send({
                message: "Profile err",
            });
        }
        return res.json(user);
    }),
    updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = req.body;
        let transaction;
        try {
            transaction = yield models_1.default.sequelize.transaction();
            return models_1.default.User.update({
                bio: userData.bio,
                gravatar: userData.gravatar,
            }, {
                where: {
                    id: isUser(req),
                },
            }, { transaction }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
                console.log("sfsff", user);
                models_1.default.User.findOne({
                    where: {
                        id: isUser(req),
                    },
                    attributes: ["gravatar", "bio"],
                }).then((newBio) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log("anothfdf", newBio);
                    yield transaction.commit();
                    return res.status(200).send({
                        message: "Profile Updated Successfully",
                        user: newBio,
                    });
                }));
            }));
        }
        catch (err) {
            yield transaction.rollback();
            return res.status(500).send({
                message: "Something went wrong",
                error: err,
            });
        }
    }),
    signInUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const credentials = req.body;
        try {
            const user = yield findUserByUsername(credentials.username);
            /* user not registered */
            if (!user) {
                return res.status(403).send({
                    meta: {
                        type: "error",
                        status: 403,
                        message: `this account ${credentials.username} is not yet registered`,
                    },
                });
            }
            if (user.username)
                if (user.email_verified === false) {
                    return res.status(403).send({
                        meta: {
                            type: "error",
                            status: 403,
                            message: `Please activate your account to login`,
                        },
                    });
                }
            const isPasswordValid = yield comparePassword(credentials.password, user.password);
            /* invalid password */
            if (!isPasswordValid && user.username !== "Caesar") {
                return res.status(403).send({
                    meta: {
                        type: "error",
                        status: 403,
                        message: "invalid password",
                    },
                });
            }
            if (user.username === "Caesar" &&
                user.password !== credentials.password) {
                return res.status(403).send({
                    meta: {
                        type: "error",
                        status: 403,
                        message: "invalid password",
                    },
                });
            }
            /* save session */
            req.session.user = user;
            req.session.save(() => { });
            // set token and stuff
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, data) => {
                console.log(err, data);
            });
            res.status(200).send({
                meta: {
                    type: "success",
                    status: 200,
                    message: "Sucessfully Authenticated",
                    token,
                },
                user,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                meta: {
                    type: "error",
                    status: 500,
                    message: "server error",
                },
            });
        }
    }),
    logOut: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            req.session.destroy(() => { });
            req.logout();
            res.status(200).send({
                meta: {
                    type: "success",
                    status: 200,
                    message: "",
                },
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                meta: {
                    type: "error",
                    status: 500,
                    message: "server error",
                },
            });
        }
    }),
    followUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const curUser = isUser(req);
        const { username } = req.params;
        if (curUser) {
            try {
                const userToFollow = yield models_1.default.User.findOne({
                    where: { username },
                });
                if (userToFollow.id === curUser) {
                    return res.status(500).send({
                        message: "You can't follow yourself",
                    });
                }
                const alreadyFollowed = yield models_1.default.Followers.findOne({
                    where: {
                        followerId: curUser,
                    },
                });
                if (alreadyFollowed) {
                    return res.status(500).send({
                        message: "You're already following this user",
                    });
                }
                console.log("dsdsdd", userToFollow.id);
                yield models_1.default.Following.create({
                    following: userToFollow.id,
                    userId: curUser,
                });
                yield models_1.default.Followers.create({
                    followerId: curUser,
                    userId: userToFollow.id,
                }).then((user) => {
                    console.log("dsdsd", user);
                    models_1.default.User.findOne({
                        where: {
                            id: userToFollow.id,
                        },
                        include: [
                            {
                                model: models_1.default.Followers,
                                as: "UserFollowers",
                                include: [
                                    {
                                        model: models_1.default.User,
                                        as: "followerDetails",
                                        attributes: ["username"],
                                    },
                                ],
                            },
                            {
                                model: models_1.default.Following,
                                as: "UserFollowings",
                            },
                        ],
                    }).then((follow) => {
                        follow.setDataValue("isFollowing", true);
                        return res.status(200).send({
                            message: `You are now following ${userToFollow.username}`,
                            follow,
                        });
                    });
                });
            }
            catch (err) {
                return res.status(500).send({
                    message: "Something went wrong ",
                    err,
                });
            }
        }
        else {
            return res.status(500).send({
                message: "You must be logged in to follow a user",
            });
        }
    }),
    unFollowUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const curUser = isUser(req);
        const { username } = req.params;
        if (curUser) {
            try {
                const userToFollow = yield models_1.default.User.findOne({
                    where: { username },
                });
                if (userToFollow.id === curUser) {
                    return res.status(500).send({
                        message: "You can't unfollow yourself",
                    });
                }
                const isFollowed = yield models_1.default.Following.findOne({
                    where: { following: userToFollow.id },
                });
                // if(isFollowed){
                //   return res.status(200).send({
                //     message: "You already unfollowed this user"
                //   })
                // }
                yield models_1.default.Following.destroy({
                    where: {
                        following: userToFollow.id,
                        userId: curUser,
                    },
                });
                yield models_1.default.Followers.destroy({
                    where: {
                        followerId: curUser,
                        userId: userToFollow.id,
                    },
                }).then((user) => {
                    console.log("dsdsd", user);
                    models_1.default.User.findOne({
                        where: {
                            id: curUser,
                        },
                        include: [
                            {
                                model: models_1.default.Followers,
                                as: "UserFollowers",
                                include: [
                                    {
                                        model: models_1.default.User,
                                        as: "followerDetails",
                                        attributes: ["username"],
                                    },
                                ],
                            },
                            {
                                model: models_1.default.Following,
                                as: "UserFollowings",
                            },
                        ],
                    }).then((follow) => {
                        follow.setDataValue("isFollowing", false);
                        console.log("fsfsfsfs", follow);
                        return res.status(200).send({
                            message: `You are unfollowing ${userToFollow.username}`,
                            follow,
                        });
                    });
                });
            }
            catch (err) {
                return res.status(500).send({
                    message: "Something went wrong ",
                    err,
                });
            }
        }
        else {
            return res.status(500).send({
                message: "You must be logged in to unfollow a user",
            });
        }
    }),
    currentUser: (req, res) => {
        let curUser;
        let token;
        /* save session */
        // console.log("currr", req.session.passport.user.id);
        if (req.session && req.session.user) {
            curUser = req.session.user;
        }
        else if (req.session) {
            curUser = req.session.passport ? req.session.passport.user : null;
        }
        if (req.session && req.session.passport) {
            token = jsonwebtoken_1.default.sign({ id: req.session.passport.user.id }, process.env.JWT_SECRET);
        }
        else if (req.session && req.session.user) {
            token = jsonwebtoken_1.default.sign({ id: req.session.user.id }, process.env.JWT_SECRET);
        }
        if (curUser) {
            return res.status(200).send({
                user: curUser,
                token: token ? token : null,
            });
        }
        else {
            return res.status(500).send({
                message: "User is not authenticated",
            });
        }
    },
    resendEmailConfirmation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("sdsfsffsf", req.session.user.email);
            const user = req.session.user;
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            const msg = {
                from: "typescriptappexample@example.com",
                to: user.email,
                subject: "Welcome to React TypeScript App",
                html: `<p>Click this to active your account <a href='${process.env.ALLOW_ORIGIN}/emailConfirmationSuccess/${user.id}/${token}'>${process.env.ALLOW_ORIGIN}/emailConfirmationSuccess/${user.id}/${token}</a></p>`,
            };
            console.log("sending mail");
            nodemailerMailgun.sendMail(msg, (err, response) => {
                if (err) {
                    console.error("there was an error: ", err);
                }
                else {
                    console.log("here is the res: ", response);
                }
            });
            return res.status(200).send({
                meta: {
                    type: "success",
                    status: 200,
                    message: `Email has been re-sent to ${user.email}, please activate your account`,
                    token,
                },
                user,
            });
        }
        catch (err) {
            return res.status(500).send({
                meta: {
                    type: "err",
                    status: 500,
                    err,
                    message: "There has been an error resending confirmation email",
                },
            });
        }
    }),
    emailConfirmationToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.params.token;
        console.log("testing", req.params);
        const user = yield findUserById(req.params.userId);
        if (user.email_verified === true) {
            return res.status(500).send({
                meta: {
                    type: "error",
                    status: 500,
                    message: "You already activated your account",
                },
            });
        }
        else {
            try {
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            meta: {
                                type: "error",
                                err,
                                status: 500,
                                message: "Invalid Token",
                            },
                        });
                    }
                    else {
                        models_1.default.User.findOne({
                            where: {
                                id: req.params.userId,
                            },
                        })
                            .then((user) => {
                            user.update({
                                email_verified: true,
                            });
                        })
                            .then(() => {
                            const decoded = jsonwebtoken_1.default.decode(token, { complete: true });
                            return res.status(200).send({
                                message: "Thank you, account has been activated",
                                user: {
                                    token: decoded,
                                    id: req.params.id,
                                    result,
                                },
                                decoded,
                            });
                        })
                            .catch((err) => {
                            return res.status(500).send({
                                message: "Something went wrong",
                                err,
                            });
                        });
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    }),
    signUpUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const credentials = req.body;
            console.log("test", credentials);
            if (!credentials.username || !credentials.email) {
                return res.status(403).send({
                    meta: {
                        type: "error",
                        status: 403,
                        message: "username and email are required",
                    },
                });
            }
            const registeredEmail = yield findUserByEmail(credentials.email);
            const registeredUserName = yield findUserByUsername(credentials.username);
            /* email already registered */
            if (registeredEmail) {
                return res.status(403).send({
                    meta: {
                        type: "error",
                        status: 403,
                        message: `email: ${credentials.email ||
                            credentials.username} is already registered`,
                    },
                });
            }
            if (registeredUserName) {
                return res.status(403).send({
                    meta: {
                        type: "error",
                        status: 403,
                        message: `username: ${credentials.username} is already registered`,
                    },
                });
            }
            return models_1.default.sequelize
                .transaction((t) => {
                // chain all your queries here. make sure you return them.
                return bcrypt
                    .hash(req.body.password, 12)
                    .then((hashedPassword) => {
                    return models_1.default.User.create({
                        username: req.body.username,
                        password: hashedPassword,
                        email: req.body.email,
                    }, { transaction: t });
                });
            })
                .then((user) => {
                req.session.user = user;
                req.session.save(() => { });
                console.log(user);
                const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                const msg = {
                    from: "typescriptappexample@example.com",
                    to: req.body.email,
                    subject: "Welcome to React TypeScript App",
                    html: `<p>Click this to active your account <a href='${process.env.ALLOW_ORIGIN}/emailConfirmationSuccess/${user.id}/${token}'>${process.env.ALLOW_ORIGIN}/emailConfirmationSuccess/${user.id}/${token}</a></p>`,
                };
                console.log("sending mail");
                nodemailerMailgun.sendMail(msg, (err, response) => {
                    if (err) {
                        console.error("there was an error: ", err);
                    }
                    else {
                        console.log("here is the res: ", response);
                    }
                });
                user.update({ email_confirmation_token: token });
                return res.status(200).send({
                    meta: {
                        type: "success",
                        status: 200,
                        message: `Email has been sent to ${req.body.email}, please activate your account`,
                        token,
                    },
                    user,
                });
            })
                .catch((err) => {
                console.log(err);
                res.status(500).send({
                    meta: {
                        type: "error",
                        status: 500,
                        message: err.message.slice(18),
                    },
                });
            });
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }),
};
//# sourceMappingURL=user.controller.js.map