import { Router } from 'express';
import { JobCompletionController } from '../controller/jobCompletion.controller';

const router = Router();
const jobCompletionController = new JobCompletionController();

router.post('/submit', (req, res) => jobCompletionController.submitWork(req, res));
router.post('/approve', (req, res) => jobCompletionController.approveWork(req, res));
router.post('/reject', (req, res) => jobCompletionController.rejectWork(req, res));

// Get all submissions
router.get('/submissions', (req, res) => jobCompletionController.getAllSubmissions(req, res));

// Get submissions by job ID
router.get('/submissions/:job_id', (req, res) => jobCompletionController.getSubmissionsByJobId(req, res));

router.post('/jobs/rate', (req, res) => jobCompletionController.rateCompletedJob(req, res)); // ✅ Correct

export default router;
