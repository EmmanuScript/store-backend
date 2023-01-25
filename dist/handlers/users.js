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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_model_1 = require("../models/users.model");
dotenv_1.default.config({});
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users', destroy);
    app.post('/users/authenticate', authenticate);
    app.patch('/users', update);
};
const store = new users_model_1.UserStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield store.index();
    res.json(users);
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(parseInt(_req.params.id));
        res.json(user);
    }
    catch (err) {
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const newUser = yield store.create(user);
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400);
        console.log(err);
        res.json("Error: User not created, " + user);
    }
});
const destroy = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield store.delete(_req.body.id);
    res.json(deleted);
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const u = yield store.authenticate(user.username, user.password);
        var token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if ((parseInt(decoded._id)) !== user.id) {
            throw new Error('User id does not match!');
        }
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    try {
        const updated = yield store.create(user);
        res.json(updated);
    }
    catch (err) {
        res.status(400);
        res.json('Error: Error undapting users' + user);
    }
});
exports.default = userRoutes;
