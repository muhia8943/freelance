"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobCompletion_controller_1 = require("../controller/jobCompletion.controller");
const router = (0, express_1.Router)();
const jobCompletionController = new jobCompletion_controller_1.JobCompletionController();
router.post('/submit', (req, res) => jobCompletionController.submitWork(req, res));
router.post('/approve', (req, res) => jobCompletionController.approveWork(req, res));
router.post('/reject', (req, res) => jobCompletionController.rejectWork(req, res));
// Get all submissions
router.get('/submissions', (req, res) => jobCompletionController.getAllSubmissions(req, res));
// Get submissions by job ID
router.get('/submissions/:job_id', (req, res) => jobCompletionController.getSubmissionsByJobId(req, res));
exports.default = router;
