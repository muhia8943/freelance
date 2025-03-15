"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const job_router_1 = __importDefault(require("./routers/job.router"));
const jobApplication_router_1 = __importDefault(require("./routers/jobApplication.router")); // Import job application routes
const jobCompletion_router_1 = __importDefault(require("./routers/jobCompletion.router"));
const chatRoutes_1 = __importDefault(require("./routers/chatRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200' // Allow only this origin
}));
app.use(express_1.default.json());
app.use('/api/auth', user_router_1.default);
app.use('/api/jobs', job_router_1.default);
app.use('/api/job-applications', jobApplication_router_1.default); // Use job application routes
app.use('/api/job-completion', jobCompletion_router_1.default);
app.use("/api/chat", chatRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
