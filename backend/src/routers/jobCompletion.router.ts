import { Router } from 'express';
import { JobCompletionController } from '../controller/jobCompletion.controller';
import { JobControllertwo } from '../controller/jobCompletion.controller'; // ✅ Ensure correct import

const router = Router();
const jobCompletionController = new JobCompletionController();
const jobControllertwo = new JobControllertwo();

router.post('/submit', jobCompletionController.submitWork);
router.post('/approve', jobCompletionController.approveWork);
router.post('/reject', jobCompletionController.rejectWork);
router.get('/submissions', jobControllertwo.getAllSubmissions.bind(jobControllertwo)); // ✅ Fix
// router.get('/client/:clientId', jobControllertwo.getClientJobs.bind(jobControllertwo)); // ✅ Fix

export default router;
