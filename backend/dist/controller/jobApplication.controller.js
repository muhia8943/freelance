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
exports.JobApplicationController = void 0;
const jobApplication_service_1 = require("../services/jobApplication.service");
const jobApplicationService = new jobApplication_service_1.JobApplicationService();
class JobApplicationController {
    applyForJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield jobApplicationService.applyForJob(req.body);
                res.status(201).json({ message: 'Application submitted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getApplicationsByJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobId = parseInt(req.params.jobId);
                const applications = yield jobApplicationService.getApplicationsByJob(jobId);
                res.json(applications);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getApplicationsByFreelancer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const freelancerId = parseInt(req.params.freelancerId);
                const applications = yield jobApplicationService.getApplicationsByFreelancer(freelancerId);
                res.json(applications);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    updateApplicationStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationId, status } = req.body;
                yield jobApplicationService.updateApplicationStatus(applicationId, status);
                res.json({ message: 'Application status updated' });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    deleteApplication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applicationId = parseInt(req.params.applicationId);
                yield jobApplicationService.deleteApplication(applicationId);
                res.json({ message: 'Application deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.JobApplicationController = JobApplicationController;
