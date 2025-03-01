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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createTransporter(configs) {
    const transporter = nodemailer_1.default.createTransport(configs);
    return transporter;
}
let configurations = ({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    auth: {
        user: "nmmuhia@gmail.com",
        pass: "dbutfqhnxnvqdsea"
    }
});
const sendMail = (messageOption) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = createTransporter(configurations);
    yield transporter.verify();
    console.log('verified');
    yield transporter.sendMail(messageOption, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(info.response);
        }
    });
});
exports.sendMail = sendMail;
