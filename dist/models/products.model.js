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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    constructor() {
        // define table
        this.table = 'products';
    }
    // select all products
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM ${this.table}`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get all products. Error: ${(err)}`);
            }
        });
    }
    // select product by id
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM ${this.table} WHERE id=$1`;
                const result = yield conn.query(sql, [productId]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get product by id. Error: ${(err)}`);
            }
        });
    }
    // select product by category
    getProdCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM ${this.table} WHERE category=$1`;
                const result = yield conn.query(sql, [category]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get product by category. Error: ${(err)}`);
            }
        });
    }
    // create product
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, category } = product;
                const sql = `INSERT INTO ${this.table} (name, price, category) VALUES($1, $2, $3) RETURNING *`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [
                    name,
                    price,
                    category
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not create product. Error: ${(err)}`);
            }
        });
    }
    // delete product
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not delete product ${id}. Error: ${(err)}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
