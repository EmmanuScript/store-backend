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
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../../models/order.model");
const products_model_1 = require("../../models/products.model");
const users_model_1 = require("../../models/users.model");
const store = new order_model_1.OrderStore();
const productStore = new products_model_1.ProductStore();
const userStore = new users_model_1.UserStore();
let productId = 1;
let userId = 1;
describe('Order Model', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield productStore.createProduct({
            name: 'Superman underroos',
            price: '40.0',
            category: 'Underwear',
        });
        productId = product.id;
        const user = yield userStore.create({
            username: 'ssmith',
            password: 'password123',
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield productStore.deleteProduct(productId);
        yield userStore.delete(userId);
    }));
    it('should create an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.createOrder({
            products_id: productId,
            quantity: 10,
            user_id: userId,
            status: 'new',
        });
        expect(result).toEqual({
            id: 1,
            products_id: productId,
            quantity: 10,
            user_id: userId,
            status: 'new',
        });
    }));
    it('should return a list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.getAllOrders();
        expect(result).toEqual([
            {
                id: 1,
                products_id: productId,
                quantity: 10,
                user_id: userId,
                status: 'new',
            },
        ]);
    }));
    it('should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.getOrders(1);
        expect(result).toEqual([{
                id: 1,
                products_id: productId,
                quantity: 10,
                user_id: userId,
                status: 'new',
            }]);
    }));
    it('should delete the order', () => __awaiter(void 0, void 0, void 0, function* () {
        yield store.deleteOrder(1);
        const result = yield store.getAllOrders();
        expect(result).toEqual([]);
    }));
});
