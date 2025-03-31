import { Request, Response } from 'express';
import { JobCompletionService } from '../services/jobCompletion.service';

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
    
    public async getAllSubmissions(req: Request, res: Response) {
        try {
            const submissions = await jobCompletionService.getAllSubmissions();
            res.status(200).json(submissions);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get submissions by job ID
    public async getSubmissionsByJobId(req: Request, res: Response) {
        try {
            const { job_id } = req.params;
            const submissions = await jobCompletionService.getSubmissionsByJobId(parseInt(job_id));
            res.status(200).json(submissions);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
