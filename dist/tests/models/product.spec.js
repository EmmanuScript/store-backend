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
const products_model_1 = require("../../models/products.model");
const store = new products_model_1.ProductStore();
describe('Product Model', () => {
    it('should create a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.createProduct({
            name: 'Test product',
            price: '40.25',
            category: 'Test category',
        });
        expect(result).toEqual({
            id: 1,
            name: 'Test product',
            price: '40.25',
            category: 'Test category',
        });
    }));
    it('should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.getProducts();
        expect(result).toEqual([{
                id: 1,
                name: 'Test product',
                price: '40.25',
                category: 'Test category',
            }]);
    }));
    it('should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.getProductById(1);
        expect(result).toEqual({
            id: 1,
            name: 'Test product',
            price: '40.25',
            category: 'Test category',
        });
    }));
    it('should delete the product', () => __awaiter(void 0, void 0, void 0, function* () {
        yield store.deleteProduct(1);
        const result = yield store.getProducts();
        expect(result).toEqual([]);
    }));
});
