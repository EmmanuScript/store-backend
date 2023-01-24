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
const products_model_1 = require("../models/products.model");
const store = new products_model_1.ProductStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield store.getProducts();
    res.json(books);
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield store.getProductById(_req.body.id);
    res.json(book);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const products = {
            id: req.body.title,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const newBook = yield store.createProduct(products);
        res.json(newBook);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const deleted = yield store.deleteProduct(req.body.id);
        res.json(deleted);
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
});
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    app.delete('/products', destroy);
};
exports.default = productRoutes;
