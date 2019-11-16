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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../models"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const comparePassword = (credentialsPassword, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isPasswordMatch = yield bcrypt.compare(credentialsPassword, userPassword);
    return isPasswordMatch;
});
exports.default = {
    getUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.default.User.findAll().then((users) => {
            res.json(users);
        });
    }),
    signInUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const credentials = req.body;
            const user = yield models_1.default.User.findOne({
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
            const isPasswordValid = yield comparePassword(credentials.password, user.password);
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
                    token: token
                },
                user: user
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                meta: {
                    type: "error",
                    status: 500,
                    message: "server error"
                }
            });
        }
    }),
    logOut: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            req.session.destroy(() => { });
            res.status(200).send({
                meta: {
                    type: "success",
                    status: 200,
                    message: ""
                }
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                meta: {
                    type: "error",
                    status: 500,
                    message: "server error"
                }
            });
        }
    }),
    tryAutoSignInUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentUserId = req.session.user.id;
            console.log(currentUserId);
            console.log(currentUserId);
            const user = yield models_1.default.User.findOne({
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
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                meta: {
                    type: "error",
                    status: 500,
                    message: "server error"
                }
            });
        }
    }),
    googleOauth: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // req.session.user = req.user;
        // req.session.save(() => {});
        // const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
        // console.log(token);
        // jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        //   console.log(err, data);
        // });
        // return res.status(200).send({
        //   token: token
        // });
        res.redirect("http:localhost:3001");
    }),
    currentUser: (req, res) => {
        let curUser;
        let token;
        if (req.session && req.session.user) {
            curUser = req.session.user.id;
        }
        if (req.user) {
            token = jsonwebtoken_1.default.sign({ id: req.user.id }, process.env.JWT_SECRET);
        }
        else if (req.session && req.session.user) {
            token = jsonwebtoken_1.default.sign({ id: req.session.user.id }, process.env.JWT_SECRET);
        }
        return res.status(200).send({
            user: req.user,
            token: token ? token : null
        });
    },
    signUpUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const registeredEmail = yield models_1.default.User.findOne({
                where: {
                    email: credentials.email
                },
                raw: true
            });
            const registeredUserName = yield models_1.default.User.findOne({
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
            return models_1.default.sequelize
                .transaction(t => {
                // chain all your queries here. make sure you return them.
                return bcrypt
                    .hash(req.body.password, 12)
                    .then((hashedPassword) => {
                    return models_1.default.User.create({
                        username: req.body.username,
                        password: hashedPassword,
                        email: req.body.email
                    }, { transaction: t });
                });
            })
                .then(user => {
                req.session.user = user;
                req.session.save(() => { });
                console.log(user);
                const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
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
        }
        catch (err) {
            console.log(err);
            return err;
        }
    })
};
//# sourceMappingURL=user.controller.js.map