"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_controller_1 = require("../controller/job.controller");
const router = express_1.default.Router();
const jobController = new job_controller_1.JobController();
router.post('/', jobController.createJob);
router.get('/completed', jobController.getCompletedJobs); // ✅ Move this ABOVE "/:id"
router.get('/:id', jobController.getJobById);
router.get('/', jobController.getAllJobs);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);
router.get('/client/:clientId', jobController.getJobsByClientId); // New Route
exports.default = router;
