"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const products_1 = __importDefault(require("../../handlers/products"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(products_1.default);
const token = jsonwebtoken_1.default.sign({ id: 1, username: 'orlando' }, 'bearer');
fdescribe('Product controllers: ', () => {
    it('should return a new user after it is created', () => {
        const data = {
            name: 'Test leather',
            price: '100',
            category: 'wallet',
        };
        request
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({
            id: 1,
            name: 'Test leather',
            price: '100',
            category: 'wallet',
        });
    });
    it('should show all products', () => {
        request
            .get('/products')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
            id: 1,
            name: 'Test leather',
            price: '100',
            category: 'wallet',
        });
    });
    it('should show a product given an id', () => {
        request
            .get('/products/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
            id: 1,
            name: 'Test leather',
            price: '100',
            category: 'wallet',
        });
    });
    it('should delete a product given its id', () => {
        request
            .delete('/api/products/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then(() => {
            request.get('/api/products').expect({
                id: 1,
                name: 'Test leather',
                price: '100',
                category: 'wallet',
            });
        });
    });
});
