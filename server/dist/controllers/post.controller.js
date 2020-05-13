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
const models_1 = __importDefault(require("../models"));
const sockets_1 = require("../sockets");
const pusherConfig_1 = __importDefault(require("./../sockets/pusherConfig"));
const profanity_1 = require("@2toad/profanity");
dotenv_1.default.config();
const filterbadWords = (word) => {
    let arr;
    let content;
    if (profanity_1.profanity.censor(word)) {
        arr = [];
        const sentence = word.split(' ');
        for (let str in sentence) {
            const newWord = sentence[str].split(' ').join('');
            console.log('newWord', newWord);
            const filteredWord = profanity_1.profanity.censor(newWord);
            arr.push(newWord.charAt(0) + filteredWord.substring(1));
            content = arr.join(' ');
        }
        return content;
    }
    else {
        return word;
    }
};
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
                {
                    model: models_1.default.Likes,
                },
                {
                    model: models_1.default.Comments,
                    include: [
                        {
                            model: models_1.default.User,
                            as: "author",
                            attributes: ["username", "gravatar", "bio"]
                        }
                    ],
                }
            ],
            order: [["createdAt", "DESC"]],
            limit: 6
        });
        let currentUser;
        currentUser = req.session && req.session.user ? req.session.user.id : 0;
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
                else if (like.userId === currentUser) {
                    post.setDataValue("likedByMe", true);
                }
                // else if(like.userId !== currentUser) {
                //   post.setDataValue("likedByMe", false);
                // }
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
                    model: models_1.default.Likes,
                },
            ],
        });
        return res.json(postPage);
    }),
    deleteComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let currentUser;
        if (req.session.passport) {
            currentUser = req.session.passport.user.id;
        }
        else {
            currentUser = req.session.user.id;
        }
        if (req.params.userId == currentUser) {
            try {
                yield models_1.default.Comments.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                return res.status(200).send('Comment has been deleted!');
            }
            catch (error) {
                console.log("There was an error", error);
                res.status(401).send("Failed to delete comment");
            }
        }
        else {
            return res.status(500).send("You can't delete another user comment");
        }
    }),
    createPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(getUser);
        let postData;
        console.log('ssd');
        if (req.user && req.user.id) {
            console.log(req.user.id);
            postData = {
                title: filterbadWords(req.body.ourTitle),
                postContent: filterbadWords(req.body.ourPostContent),
                userId: req.session.passport.user.id
            };
        }
        else {
            postData = {
                title: filterbadWords(req.body.ourTitle),
                postContent: filterbadWords(req.body.ourPostContent),
                userId: req.session.user.id
            };
        }
        console.log('dsdsdsdsdsdsdsdsdds', postData);
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
                    },
                    {
                        model: models_1.default.Comments,
                        include: [
                            {
                                model: models_1.default.User,
                                as: "author",
                                attributes: ["username", "gravatar", "bio"]
                            }
                        ]
                    }
                ],
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
    postComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let currentUser;
        let content;
        let arr;
        if (req.session.passport) {
            currentUser = req.session.passport.user.id;
        }
        else {
            currentUser = req.session.user.id;
        }
        try {
            const postData = {
                comment_body: filterbadWords(req.body.comment_body),
                userId: currentUser,
                postId: req.body.id,
                gifUrl: req.body.gifUrl
            };
            console.log('dfffcheck', postData);
            yield models_1.default.Comments.create(postData)
                .then((comment) => {
                console.log('this is the comment', comment);
                models_1.default.Comments.findOne({
                    where: {
                        id: comment.id
                    },
                    include: [
                        {
                            model: models_1.default.User,
                            as: "author",
                            attributes: ["username", "gravatar"]
                        }
                    ]
                }).then((newComment) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log('dsdsdssdsd', newComment.postId, newComment.userId); // con
                    sockets_1.NotificationServ.newCommentNotification(newComment.postId, newComment.userId);
                    pusherConfig_1.default.trigger('post-comments', 'new-comment', { comment: newComment });
                    return res.status(200).send({
                        message: "comment created",
                        comment: newComment
                    });
                }));
            });
        }
        catch (error) {
            console.log("There was an error", error);
            return res.status(500).send({
                message: "Failed to write a comment",
                error
            });
        }
    }),
    editComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let currentUser;
        let transaction;
        console.log('testtttt', req.body);
        if (req.session.passport) {
            currentUser = req.session.passport.user.id;
        }
        else {
            currentUser = req.session.user.id;
        }
        if (req.body.comment_body && req.body.gifUrl) {
            return res.status(401).send({
                message: "Can\'t edit both"
            });
        }
        console.log('dfdfdfd', req.params.userId, currentUser);
        if (req.params.userId != currentUser) {
            return res.status(401).send({
                message: "Can\'t edit another users post"
            });
        }
        else {
            try {
                transaction = yield models_1.default.sequelize.transaction();
                return models_1.default.Comments.update({
                    comment_body: filterbadWords(req.body.commentData) ? filterbadWords(req.body.commentData) : "",
                    gifUrl: req.body.gifUrl ? req.body.gifUrl : ""
                }, {
                    where: {
                        id: req.params.commentId,
                    },
                }, { transaction }).then((comment) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log("anothfdf", comment);
                    yield transaction.commit();
                    return res.status(200).send({
                        message: "Comment Edited Successfully",
                    });
                }));
            }
            catch (err) {
                console.log("something went wrong", err);
                res.status(401).send({
                    message: "Something went wrong"
                });
            }
        }
    }),
    deletePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let currentUser;
        if (req.session.passport) {
            currentUser = req.session.passport.user.id;
        }
        else {
            currentUser = req.session.user.id;
        }
        console.log(req.params);
        if (req.params.userId == currentUser) {
            try {
                yield models_1.default.Post.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                return res.status(200).send('Post has been deleted!');
            }
            catch (error) {
                console.log("There was an error", error);
                res.status(401).send("Failed to delete");
            }
        }
        else {
            return res.status(500).send("You can't delete another user post");
        }
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
                // find all likes, and if like === currentUser id, heart will be filled
                const likes = yield models_1.default.Likes.findAll();
                if (likes.length === 0) {
                    console.log('this got called');
                    post.setDataValue("likedByMe", true);
                }
                if (likes) {
                    likes.forEach(like => {
                        if (like.userId === currentUser) {
                            console.log('wwdff', like);
                            post.setDataValue("likedByMe", true);
                        }
                    });
                }
                yield transaction.commit();
                return res.status(200).json({
                    message: "You liked this post",
                    post
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
                const likes = yield models_1.default.Likes.findAll();
                if (likes) {
                    likes.forEach(like => {
                        console.log('dislike', like);
                        if (like.userId === currentUser) {
                            post.setDataValue("likedByMe", false);
                        }
                    });
                }
                yield transaction.commit();
                return res.status(200).json({
                    message: "You unliked this post",
                    post
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
};
//# sourceMappingURL=post.controller.js.map