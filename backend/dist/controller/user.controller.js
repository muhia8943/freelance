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
exports.updateUser = exports.deleteUser = exports.getAllUsers = exports.login = exports.register = void 0;
const user_service_1 = require("../services/user.service");
const authService = new user_service_1.AuthService();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authService.register(req.body);
        res.status(201).send('User registered successfully');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield authService.login(email, password);
        if (result) {
            res.json(result); // Respond with token and role
        }
        else {
            res.status(401).send('Invalid credentials');
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.login = login;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield authService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authService.deleteUser(Number(req.params.id));
        res.status(200).send('User deleted successfully.');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authService.updateUser(Number(req.params.id), req.body);
        res.status(200).send('User updated successfully.');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.updateUser = updateUser;
