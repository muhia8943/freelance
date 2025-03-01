import { Router } from 'express';
import { JobApplicationController } from '../controller/jobApplication.controller';

const router = Router();
const jobApplicationController = new JobApplicationController();

router.post('/apply', jobApplicationController.applyForJob);
router.get('/job/:jobId', jobApplicationController.getApplicationsByJob);
router.get('/freelancer/:freelancerId', jobApplicationController.getApplicationsByFreelancer);
router.put('/update-status', jobApplicationController.updateApplicationStatus);
router.delete('/:applicationId', jobApplicationController.deleteApplication);

export default router;
