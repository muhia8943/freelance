import { Request, Response } from 'express';
import { JobService } from '../services/job.service';

const jobService = new JobService();

export class JobController {
    public async createJob(req: Request, res: Response): Promise<void> {
        try {
            const jobData = req.body;
            await jobService.createJob(jobData);
            res.status(201).json({ message: 'Job created successfully' });
        } catch (error:any) {
            res.status(500).json({ error: 'Error creating job', details: error.message });
        }
    }

    public async getJobById(req: Request, res: Response): Promise<void> {
        try {
            const jobId = parseInt(req.params.id);
            const job = await jobService.getJobById(jobId);

            if (!job) {
                res.status(404).json({ message: 'Job not found' });
                return;
            }

            res.status(200).json(job);
        } catch (error:any) {
            res.status(500).json({ error: 'Error retrieving job', details: error.message });
        }
    }

    public async getAllJobs(req: Request, res: Response): Promise<void> {
        try {
            const jobs = await jobService.getAllJobs();
            res.status(200).json(jobs);
        } catch (error:any) {
            res.status(500).json({ error: 'Error retrieving jobs', details: error.message });
        }
    }

    public async updateJob(req: Request, res: Response): Promise<void> {
        try {
            const jobId = parseInt(req.params.id);
            const jobUpdates = req.body;
            await jobService.updateJob(jobId, jobUpdates);
            res.status(200).json({ message: 'Job updated successfully' });
        } catch (error:any) {
            res.status(500).json({ error: 'Error updating job', details: error.message });
        }
    }

    public async deleteJob(req: Request, res: Response): Promise<void> {
        try {
            const jobId = parseInt(req.params.id);
            await jobService.deleteJob(jobId);
            res.status(200).json({ message: 'Job deleted successfully' });
        } catch (error:any) {
            res.status(500).json({ error: 'Error deleting job', details: error.message });
        }
    }
}
