import { poolPromise } from '../config/sql.config';
import * as sql from 'mssql';

export class JobCompletionService {
    // Freelancer submits completed work
    public async submitWork(jobId: number, freelancerId: number, submissionLink: string, notes: string) {
        const pool = await poolPromise;
        await pool.request()
            .input('job_id', sql.Int, jobId)
            .input('freelancer_id', sql.Int, freelancerId)
            .input('submission_link', sql.NVarChar, submissionLink)
            .input('notes', sql.Text, notes)
            .execute('spSubmitJobWork');
    }

    // Client approves work & marks job as completed
    public async approveWork(submissionId: number, clientId: number) {
        const pool = await poolPromise;
        await pool.request()
            .input('submission_id', sql.Int, submissionId)
            .input('client_id', sql.Int, clientId)
            .execute('spApproveJobWork');
    }

    // Client rejects work
    public async rejectWork(submissionId: number, reason: string) {
        const pool = await poolPromise;
        await pool.request()
            .input('submission_id', sql.Int, submissionId)
            .input('reason', sql.Text, reason)
            .execute('spRejectJobWork');
    }
    
    // Get all job submissions
    public async getAllSubmissions() {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM JobSubmissions');
        return result.recordset;
    }

    // Get submissions by job ID
    public async getSubmissionsByJobId(jobId: number) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('job_id', sql.Int, jobId)
            .query('SELECT * FROM JobSubmissions WHERE job_id = @job_id');
        return result.recordset;
    }
}
