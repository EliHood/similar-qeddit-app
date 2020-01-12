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
const models_1 = __importDefault(require("../models"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    getPosts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // use async/await here
        const posts = yield models_1.default.Post.findAll({
            include: [
                {
                    model: models_1.default.User,
                    as: "author",
                    attributes: ["username", "gravatar", "bio"]
                },
                // limit the likes based on the logged in user
                {
                    model: models_1.default.Likes
                }
            ],
            order: [["createdAt", "DESC"]],
            limit: 6
        });
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
                }
                else if (like.userId === req.session.user.id) {
                    post.setDataValue("likedByMe", true);
                }
            });
        });
        return res.json(posts);
    }),
    postPage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postPage = yield models_1.default.Post.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: models_1.default.User,
                    as: "author",
                    attributes: ["username", "gravatar", "bio"]
                },
                // limit the likes based on the logged in user
                {
                    model: models_1.default.Likes
                }
            ],
        });
        return res.json(postPage);
    }),
    createPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(getUser);
        let postData;
        if (req.user && req.user.id) {
            console.log(req.user.id);
            postData = {
                title: req.body.title,
                postContent: req.body.postContent,
                userId: req.session.passport.user.id
            };
        }
        else {
            postData = {
                title: req.body.title,
                postContent: req.body.postContent,
                userId: req.session.user.id
            };
        }
        yield models_1.default.Post.create(postData)
            .then(post => {
            models_1.default.Post.findOne({
                where: {
                    id: post.id
                },
                include: [
                    {
                        model: models_1.default.User,
                        as: "author",
                        attributes: ["username", "gravatar"]
                    }
                ]
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
    }),
    likePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // fetch created and post at the same time
        let currentUser;
        if (req.session.passport) {
            currentUser = req.session.passport.user.id;
        }
        else {
            currentUser = req.session.user.id;
        }
        const [created, post] = yield Promise.all([
            models_1.default.Likes.findOne({
                where: {
                    userId: currentUser,
                    resourceId: req.params.id
                }
            }),
            models_1.default.Post.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: models_1.default.User,
                        as: "author",
                        attributes: ["username", "gravatar", "bio"]
                    },
                    // limit the likes based on the logged in user
                    {
                        model: models_1.default.Likes
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
            transaction = yield models_1.default.sequelize.transaction();
            if (created && post) {
                return res.status(200).send({
                    message: "You already liked this post"
                });
            }
            if (!created && post) {
                // use Promise.all() for concurrency
                yield Promise.all([
                    models_1.default.Likes.create({
                        userId: currentUser,
                        resourceId: req.params.id
                    }, { transaction }),
                    post.increment("likeCounts", { by: 1, transaction }),
                ]);
                console.log('test user', currentUser);
                const likes = yield models_1.default.Likes.findAll();
                if (likes) {
                    likes.forEach(like => {
                        console.log('wwdff', like);
                        if (like.userId === currentUser) {
                            post.setDataValue("likedByMe", true);
                        }
                    });
                }
                //   else{
                //     post.Likes.forEach( (like) => {
                //       console.log('testusff', like)
                //       if(like.userId === currentUser){
                //         post.setDataValue("likedByMe", true);
                //       }
                //       else{
                //         post.setDataValue("likedByMe", false);
                //       }
                //     })
                //     post.save()
                // }
                // if (post.Likes.length === 0) {
                //   post.liked = true,
                //   post.save()
                // } else{
                //   post.Likes.forEach(like => {
                //     // console.log(like.userId);
                //     console.log('liked',post)
                //     if (like.userId === req.session.user.id) {
                //       post.liked = true,
                //       post.save()
                //     }
                //   });
                // }
                yield transaction.commit();
                return res.status(200).json({
                    message: "You liked this post",
                    post: post
                });
            }
        }
        catch (err) {
            if (transaction) {
                yield transaction.rollback();
            }
            console.log("There was an error", err);
            return res.status(500);
        }
    }),
    disLikePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let currentUser;
        if (req.session.passport) {
            currentUser = req.session.passport.user.id;
        }
        else {
            currentUser = req.session.user.id;
        }
        const [created, post] = yield Promise.all([
            models_1.default.Likes.findOne({
                where: {
                    userId: currentUser,
                    resourceId: req.params.id
                }
            }),
            models_1.default.Post.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: models_1.default.User,
                        as: "author",
                        attributes: ["username", "gravatar", "bio"]
                    },
                    // limit the likes based on the logged in user
                    {
                        model: models_1.default.Likes
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
            transaction = yield models_1.default.sequelize.transaction();
            if (created && post) {
                yield Promise.all([
                    models_1.default.Likes.destroy({
                        where: {
                            userId: currentUser,
                            resourceId: req.params.id
                        }
                    }, { transaction }),
                    post.decrement("likeCounts", { by: 1, transaction }),
                ]);
                post.Likes.forEach((like) => {
                    console.log('tesssstusff', like);
                    if (like.userId === currentUser) {
                        post.setDataValue("likedByMe", false);
                    }
                    else {
                        post.setDataValue("likedByMe", false);
                    }
                });
                const likes = yield models_1.default.Likes.findAll();
                if (likes) {
                    likes.forEach(like => {
                        console.log('dislike', like);
                        if (like.userId === currentUser) {
                            post.setDataValue("likedByMe", false);
                        }
                    });
                }
                //   else{
                //     post.Likes.forEach( (like) => {
                //       console.log('testusff', like)
                //       if(like.userId === currentUser){
                //         post.setDataValue("likedByMe", true);
                //       }
                //       else{
                //         post.setDataValue("likedByMe", false);
                //       }
                //     })
                //     post.save()
                // }
                yield transaction.commit();
                return res.status(200).json({
                    message: "You unliked this post",
                    post: post
                });
            }
        }
        catch (err) {
            if (transaction) {
                yield transaction.rollback();
            }
            console.log("There was an error", err);
            return res.status(500);
        }
    })
};
//# sourceMappingURL=post.controller.js.map