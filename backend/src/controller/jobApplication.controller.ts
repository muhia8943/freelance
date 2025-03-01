import { Request, Response } from 'express';
import { JobApplicationService } from '../services/jobApplication.service';

const jobApplicationService = new JobApplicationService();

export class JobApplicationController {
    public async applyForJob(req: Request, res: Response): Promise<void> {
        try {
            await jobApplicationService.applyForJob(req.body);
            res.status(201).json({ message: 'Application submitted successfully' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getApplicationsByJob(req: Request, res: Response): Promise<void> {
        try {
            const jobId = parseInt(req.params.jobId);
            const applications = await jobApplicationService.getApplicationsByJob(jobId);
            res.json(applications);
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getApplicationsByFreelancer(req: Request, res: Response): Promise<void> {
        try {
            const freelancerId = parseInt(req.params.freelancerId);
            const applications = await jobApplicationService.getApplicationsByFreelancer(freelancerId);
            res.json(applications);
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateApplicationStatus(req: Request, res: Response): Promise<void> {
        try {
            const { applicationId, status } = req.body;
            await jobApplicationService.updateApplicationStatus(applicationId, status);
            res.json({ message: 'Application status updated' });
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteApplication(req: Request, res: Response): Promise<void> {
        try {
            const applicationId = parseInt(req.params.applicationId);
            await jobApplicationService.deleteApplication(applicationId);
            res.json({ message: 'Application deleted successfully' });
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }
}
