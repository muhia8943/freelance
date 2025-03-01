import { Request, Response } from 'express';
import { JobCompletionService } from '../services/jobCompletion.service';
import { JobServicetwo } from '../services/jobCompletion.service';

const jobCompletionService = new JobCompletionService();

export class JobCompletionController {
    public async submitWork(req: Request, res: Response) {
        try {
            const { job_id, freelancer_id, submission_link, notes } = req.body;
            await jobCompletionService.submitWork(job_id, freelancer_id, submission_link, notes);
            res.status(200).json({ message: "Job work submitted successfully!" });
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async approveWork(req: Request, res: Response) {
        try {
            const { submission_id, client_id } = req.body;
            await jobCompletionService.approveWork(submission_id, client_id);
            res.status(200).json({ message: "Job work approved!" });
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async rejectWork(req: Request, res: Response) {
        try {
            const { submission_id, reason } = req.body;
            await jobCompletionService.rejectWork(submission_id, reason);
            res.status(200).json({ message: "Job work rejected!" });
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }
    
}
const jobService = new JobServicetwo();

export class JobControllertwo {
    
    // Get all job submissions
    public async getAllSubmissions(req: Request, res: Response) {
        try {
            const submissions = await jobService.getAllSubmissions();
            res.json(submissions);
        } catch (error) {
            res.status(500).json({ message: "Error fetching submissions", error });
        }
    }

    // Get all jobs for a specific client
    public async getClientJobs(req: Request, res: Response) {
        try {
            const clientId = parseInt(req.params.clientId);
            if (isNaN(clientId)) {
                return res.status(400).json({ message: "Invalid client ID" });
            }
            const jobs = await jobService.getClientJobs(clientId);
            res.json(jobs);
        } catch (error) {
            res.status(500).json({ message: "Error fetching client jobs", error });
        }
    }
}
