"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AuthService = void 0;
const sql_config_1 = require("../config/sql.config");
const sql = __importStar(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Received user data:", user); // Debugging log
            const pool = yield sql_config_1.poolPromise;
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
            // Extract role correctly
            const role = user.role || user.role; // Handle lowercase & uppercase property names
            console.log("Extracted role from request:", role); // Debugging log
            if (!role) {
                console.log("Role not provided, setting default role: user");
            }
            const finalRole = ['admin', 'client', 'user'].includes(role) ? role : 'user';
            console.log("Final assigned role:", finalRole); // Debugging log
            yield pool.request()
                .input('username', sql.NVarChar, user.username)
                .input('password', sql.NVarChar, hashedPassword)
                .input('email', sql.NVarChar, user.email)
                .input('role', sql.NVarChar, finalRole)
                .execute('spRegisterUser');
            // Send welcome email
            // const templatePath = path.resolve(__dirname, '../templates/welcomeUser.ejs');
            // const emailContent = await ejs.renderFile(templatePath, { UserName: user.username });
            // const mailOptions = {
            //     from: process.env.EMAIL as string,
            //     to: user.email,
            //     subject: "Welcome to plana",
            //     html: emailContent
            // };
            // await sendMail(mailOptions);
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            const result = yield pool.request()
                .input('email', sql.NVarChar, email)
                .execute('spLoginUser');
            if (result.recordset.length > 0) {
                const user = result.recordset[0];
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (isMatch) {
                    const token = jsonwebtoken_1.default.sign({ id: user.id, Role: user.Role }, process.env.JWT_SECRET, {
                        expiresIn: '1h'
                    });
                    return { token, Role: user.Role, userID: user.id }; // Return the token, role, and userID
                }
            }
            return null;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            const result = yield pool.request().query('SELECT * FROM Users');
            return result.recordset;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            yield pool.request().input('id', sql.Int, id).execute('spDeleteUser');
        });
    }
    updateUser(id, updateUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            console.log("Updating user with ID:", id); // Debugging log
            console.log("Update data:", updateUser); // Debugging log
            yield pool.request()
                .input('id', sql.Int, id) // Use 'id' parameter instead of updateUser.UserID
                .input('username', sql.NVarChar, updateUser.username)
                .input('email', sql.NVarChar, updateUser.email)
                .input('role', sql.NVarChar, updateUser.role)
                .input('phoneNumber', sql.NVarChar, updateUser.phonenumber)
                .input('profilePicture', sql.NVarChar, updateUser.profile_picture)
                .input('skills', sql.Text, updateUser.skills)
                .input('bio', sql.Text, updateUser.bio)
                .execute('spUpdateUser');
        });
    }
    getProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            console.log("Fetching profile for user ID:", id); // Debugging log
            const result = yield pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Users WHERE  UserID = @id');
            if (result.recordset.length > 0) {
                return result.recordset[0];
            }
            return null;
        });
    }
    getUsersByRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            console.log(`Fetching users with role: ${role}`); // Debugging log
            const result = yield pool.request()
                .input('role', sql.NVarChar, role)
                .query('SELECT * FROM Users WHERE Role = @role');
            return result.recordset;
        });
    }
    getClients() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getUsersByRole('client');
        });
    }
    getRegularUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getUsersByRole('user');
        });
    }
}
exports.AuthService = AuthService;
