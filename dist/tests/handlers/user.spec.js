"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const users_1 = __importDefault(require("../../handlers/users"));
const request = (0, supertest_1.default)(users_1.default);
describe('Users controllers: ', () => {
    it('/users/create should return a user', () => {
        const data = {
            username: 'orlando',
            password: 'emmanue234',
        };
        request
            .post('/users')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201);
    });
    it('/users/:id should show a user', () => {
        request
            .get('/users/1')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            id: 1,
            username: 'orlando',
        });
    });
    it('/users/:id should authenticate a user', () => {
        request.post('/users/authenticate').expect(200);
    });
});
