"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.register);
router.post('/login', user_controller_1.login);
router.get('/users', user_controller_1.getAllUsers);
router.delete('/users/:id', user_controller_1.deleteUser);
router.put('/users/:id', user_controller_1.updateUser);
router.get('/profile/:id', user_controller_1.getProfile); // New Route for Profile Retrieval
exports.default = router;
