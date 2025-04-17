import express from 'express';
import { JobController } from '../controller/job.controller';

const router = express.Router();
const jobController = new JobController();

router.post('/', jobController.createJob);
router.get('/completed', jobController.getCompletedJobs);
router.get('/:id', jobController.getJobById);
router.get('/', jobController.getAllJobs);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);
router.get('/client/:clientId', jobController.getJobsByClientId); 
router.get('/completed/client/:clientId', jobController.getCompletedJobsByClientId);

// ✅ New Route: Get Completed Jobs by Freelancer (completed_by)
router.get('/completed/freelancer/:freelancerId', jobController.getCompletedJobsByFreelancerId);

export default router;
