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
exports.AuthController = exports.getProfile = exports.updateUser = exports.deleteUser = exports.getAllUsers = exports.login = exports.register = void 0;
const user_service_1 = require("../services/user.service");
const authService = new user_service_1.AuthService();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authService.register(req.body);
        res.status(201).json({ message: 'User registered successfully' });
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
            res.status(401).json({ error: 'Invalid credentials' });
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
        res.status(200).json({ message: 'User updated successfully.' }); // ✅ Ensure JSON response
    }
    catch (error) {
        console.error("Update User Error:", error); // 🔍 Log error
        res.status(500).json({ error: error.message }); // ✅ Send error as JSON
    }
});
exports.updateUser = updateUser;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        const userProfile = yield authService.getProfile(userId);
        if (!userProfile) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(userProfile);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getProfile = getProfile;
class AuthController {
    getClients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield authService.getClients();
                res.status(200).json(clients);
            }
            catch (error) {
                res.status(500).json({ error: 'Error retrieving clients', details: error.message });
            }
        });
    }
    getRegularUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield authService.getRegularUsers();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ error: 'Error retrieving users', details: error.message });
            }
        });
    }
}
exports.AuthController = AuthController;
