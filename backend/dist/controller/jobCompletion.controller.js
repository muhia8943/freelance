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
exports.JobControllertwo = exports.JobCompletionController = void 0;
const jobCompletion_service_1 = require("../services/jobCompletion.service");
const jobCompletion_service_2 = require("../services/jobCompletion.service");
const jobCompletionService = new jobCompletion_service_1.JobCompletionService();
class JobCompletionController {
    submitWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { job_id, freelancer_id, submission_link, notes } = req.body;
                yield jobCompletionService.submitWork(job_id, freelancer_id, submission_link, notes);
                res.status(200).json({ message: "Job work submitted successfully!" });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    approveWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { submission_id, client_id } = req.body;
                yield jobCompletionService.approveWork(submission_id, client_id);
                res.status(200).json({ message: "Job work approved!" });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    rejectWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { submission_id, reason } = req.body;
                yield jobCompletionService.rejectWork(submission_id, reason);
                res.status(200).json({ message: "Job work rejected!" });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.JobCompletionController = JobCompletionController;
const jobService = new jobCompletion_service_2.JobServicetwo();
class JobControllertwo {
    // Get all job submissions
    getAllSubmissions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const submissions = yield jobService.getAllSubmissions();
                res.json(submissions);
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching submissions", error });
            }
        });
    }
    // Get all jobs for a specific client
    getClientJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientId = parseInt(req.params.clientId);
                if (isNaN(clientId)) {
                    return res.status(400).json({ message: "Invalid client ID" });
                }
                const jobs = yield jobService.getClientJobs(clientId);
                res.json(jobs);
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching client jobs", error });
            }
        });
    }
}
exports.JobControllertwo = JobControllertwo;
