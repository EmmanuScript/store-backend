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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    constructor() {
        // define table
        this.table = 'orders';
    }
    // select all orders for a user
    getOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM ${this.table} WHERE user_id=$1`;
                const result = yield conn.query(sql, [userId]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get all orders of user. Error: ${err}}`);
            }
        });
    }
    // Get current order by user id
    getCurrentOrderByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM ${this.table} WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get current order. Error: ${(err)}`);
            }
        });
    }
    // Get active order by user id
    getActiveOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = 'active';
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM ${this.table} WHERE user_id = ${userId} AND status = $1`;
                const result = yield conn.query(sql, [status]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get active order. Error: ${(err)}`);
            }
        });
    }
    // select completed order by user id
    getCompletedOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = 'complete';
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM ${this.table} WHERE user_id = ${userId} AND status = $1`;
                const result = yield conn.query(sql, [status]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get completed orders. Error: ${(err)}`);
            }
        });
    }
    // create an order
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line camelcase
                const { product_id, quantity, user_id, status } = order;
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO ${this.table} (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *`;
                const result = yield conn.query(sql, [
                    // eslint-disable-next-line camelcase
                    product_id,
                    quantity,
                    // eslint-disable-next-line camelcase
                    user_id,
                    status
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not create order. Error: ${(err)}`);
            }
        });
    }
    // update an order
    updateOrderStatus(status, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE ${this.table} SET status=$1 WHERE id=$2 RETURNING *`;
                const result = yield conn.query(sql, [status, orderId]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not update order status. Error: ${(err)}`);
            }
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. Error: ${(err)}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
