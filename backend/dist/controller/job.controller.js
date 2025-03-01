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
exports.JobController = void 0;
const job_service_1 = require("../services/job.service");
const jobService = new job_service_1.JobService();
class JobController {
    createJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobData = req.body;
                yield jobService.createJob(jobData);
                res.status(201).json({ message: 'Job created successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error creating job', details: error.message });
            }
        });
    }
    getJobById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobId = parseInt(req.params.id);
                const job = yield jobService.getJobById(jobId);
                if (!job) {
                    res.status(404).json({ message: 'Job not found' });
                    return;
                }
                res.status(200).json(job);
            }
            catch (error) {
                res.status(500).json({ error: 'Error retrieving job', details: error.message });
            }
        });
    }
    getAllJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobs = yield jobService.getAllJobs();
                res.status(200).json(jobs);
            }
            catch (error) {
                res.status(500).json({ error: 'Error retrieving jobs', details: error.message });
            }
        });
    }
    updateJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobId = parseInt(req.params.id);
                const jobUpdates = req.body;
                yield jobService.updateJob(jobId, jobUpdates);
                res.status(200).json({ message: 'Job updated successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error updating job', details: error.message });
            }
        });
    }
    deleteJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobId = parseInt(req.params.id);
                yield jobService.deleteJob(jobId);
                res.status(200).json({ message: 'Job deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error deleting job', details: error.message });
            }
        });
    }
}
exports.JobController = JobController;
