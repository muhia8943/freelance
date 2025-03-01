import { poolPromise } from '../config/sql.config';
import { Job } from '../interfaces/job.interface';
import * as sql from 'mssql';

export class JobService {
    public async createJob(job: Job): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('client_id', sql.Int, job.client_id)
            .input('title', sql.NVarChar, job.title)
            .input('description', sql.Text, job.description)
            .input('required_skills', sql.Text, job.required_skills)
            .input('budget', sql.Decimal(10, 2), job.budget)
            .input('deadline', sql.Date, job.deadline)
            .execute('spCreateJob');
    }

    public async getJobById(id: number): Promise<Job | null> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .execute('spGetJobById');

        return result.recordset.length > 0 ? result.recordset[0] : null;
    }

    public async getAllJobs(): Promise<Job[]> {
        const pool = await poolPromise;
        const result = await pool.request().execute('spGetAllJobs');
        return result.recordset;
    }

    public async updateJob(id: number, updatedJob: Partial<Job>): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, id)
            .input('title', sql.NVarChar, updatedJob.title)
            .input('description', sql.Text, updatedJob.description)
            .input('required_skills', sql.Text, updatedJob.required_skills)
            .input('budget', sql.Decimal(10, 2), updatedJob.budget)
            .input('deadline', sql.Date, updatedJob.deadline)
            .input('status', sql.NVarChar, updatedJob.status)
            .execute('spUpdateJob');
    }

    public async deleteJob(id: number): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, id)
            .execute('spDeleteJob');
    }
}
