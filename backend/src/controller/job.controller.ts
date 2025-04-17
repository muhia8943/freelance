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
    public async getJobsByClientId(req: Request, res: Response): Promise<void> {
        try {
            const clientId = parseInt(req.params.clientId);
            if (isNaN(clientId)) {
                res.status(400).json({ error: 'Invalid client ID' });
                return;
            }

            const jobs = await jobService.getJobsByClientId(clientId);
            res.status(200).json(jobs);
        } catch (error: any) {
            res.status(500).json({ error: 'Error retrieving jobs by client ID', details: error.message });
        }
    }
    // ✅ New Method to Get Completed Jobs
    public async getCompletedJobs(req: Request, res: Response): Promise<void> {
        try {
            const jobs = await jobService.getCompletedJobs();
            
            if (jobs.length === 0) {
                res.status(404).json({ message: 'No completed jobs found' }); // Use this instead
                return;
            }
    
            res.status(200).json(jobs);
        } catch (error: any) {
            res.status(500).json({ error: 'Error retrieving completed jobs', details: error.message });
        }
    }
    public async getCompletedJobsByClientId(req: Request, res: Response): Promise<void> {
        try {
            const clientId = parseInt(req.params.clientId);
            if (isNaN(clientId)) {
                res.status(400).json({ error: 'Invalid client ID' });
                return;
            }
    
            const jobs = await jobService.getCompletedJobsByClientId(clientId);
            res.status(200).json(jobs);
        } catch (error: any) {
            res.status(500).json({ error: 'Error retrieving completed jobs', details: error.message });
        }
    }
    // ✅ Get Completed Jobs by Freelancer (completed_by)
    public async getCompletedJobsByFreelancerId(req: Request, res: Response): Promise<void> {
        try {
            const freelancerId = parseInt(req.params.freelancerId);
            if (isNaN(freelancerId)) {
                res.status(400).json({ error: 'Invalid freelancer ID' });
                return;
            }

            const jobs = await jobService.getCompletedJobsByFreelancerId(freelancerId);
            res.status(200).json(jobs);
        } catch (error: any) {
            res.status(500).json({ error: 'Error retrieving completed jobs by freelancer ID', details: error.message });
        }
    }
}
