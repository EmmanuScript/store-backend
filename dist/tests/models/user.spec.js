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
const users_model_1 = require("../../models/users.model");
const store = new users_model_1.UserStore();
describe('User Model', () => {
    it('should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            username: 'ssmith',
            password: 'password123',
        });
        expect(result.username).toEqual('ssmith');
    }));
    it('should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result.length).toEqual(1);
    }));
    it('should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = 1;
        const result = yield store.show(userId);
        expect(result.username).toEqual('ssmith');
    }));
    it('should delete the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = 1;
        yield store.delete(userId);
        const users = yield store.index();
        expect(users.length).toEqual(0);
    }));
});
