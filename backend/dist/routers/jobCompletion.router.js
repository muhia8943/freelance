"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobCompletion_controller_1 = require("../controller/jobCompletion.controller");
const jobCompletion_controller_2 = require("../controller/jobCompletion.controller"); // ✅ Ensure correct import
const router = (0, express_1.Router)();
const jobCompletionController = new jobCompletion_controller_1.JobCompletionController();
const jobControllertwo = new jobCompletion_controller_2.JobControllertwo();
router.post('/submit', jobCompletionController.submitWork);
router.post('/approve', jobCompletionController.approveWork);
router.post('/reject', jobCompletionController.rejectWork);
router.get('/submissions', jobControllertwo.getAllSubmissions.bind(jobControllertwo)); // ✅ Fix
// router.get('/client/:clientId', jobControllertwo.getClientJobs.bind(jobControllertwo)); // ✅ Fix
exports.default = router;
