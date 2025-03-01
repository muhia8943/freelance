import { poolPromise } from '../config/sql.config';
import { JobApplication } from '../interfaces/jobApplicaton.interface';
import * as sql from 'mssql';

export class JobApplicationService {
    public async applyForJob(application: JobApplication): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('job_id', sql.Int, application.job_id)
            .input('freelancer_id', sql.Int, application.freelancer_id)
            .input('cover_letter', sql.NVarChar, application.cover_letter)
            .execute('spApplyForJob');
    }

    public async getApplicationsByJob(jobId: number): Promise<JobApplication[]> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('job_id', sql.Int, jobId)
            .execute('spGetApplicationsByJob');
        return result.recordset;
    }

    public async getApplicationsByFreelancer(freelancerId: number): Promise<JobApplication[]> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('freelancer_id', sql.Int, freelancerId)
            .execute('spGetApplicationsByFreelancer');
        return result.recordset;
    }

    public async updateApplicationStatus(applicationId: number, status: string): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('application_id', sql.Int, applicationId)
            .input('status', sql.NVarChar, status)
            .execute('spUpdateApplicationStatus');
    }

    public async deleteApplication(applicationId: number): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('application_id', sql.Int, applicationId)
            .execute('spDeleteApplication');
    }
}
