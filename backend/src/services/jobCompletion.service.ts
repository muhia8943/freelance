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
    
}
export class JobServicetwo {
    
    // Get all job submissions (for admins & freelancers)
    public async getAllSubmissions(): Promise<any[]> {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT ja.id, ja.job_id, ja.freelancer_id, ja.submission_url, ja.status, 
                   j.title AS job_title, u.username AS freelancer_name
            FROM JobApplications ja
            JOIN Jobs j ON ja.job_id = j.id
            JOIN Users u ON ja.freelancer_id = u.UserID
        `);
        return result.recordset;
    }

    // Get all jobs posted by a specific client
    public async getClientJobs(clientId: number): Promise<any[]> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('client_id', sql.Int, clientId)
            .query(`
                SELECT j.id, j.title, j.description, j.status, j.created_at
                FROM Jobs j
                WHERE j.client_id = @client_id
            `);
        return result.recordset;
    }
}
