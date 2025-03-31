import express from 'express';
import { JobController } from '../controller/job.controller';

const router = express.Router();
const jobController = new JobController();

router.post('/', jobController.createJob);
router.get('/completed', jobController.getCompletedJobs); // ✅ Move this ABOVE "/:id"
router.get('/:id', jobController.getJobById);
router.get('/', jobController.getAllJobs);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);
router.get('/client/:clientId', jobController.getJobsByClientId); // New Route

export default router;
