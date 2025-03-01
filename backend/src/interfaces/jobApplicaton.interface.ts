export interface JobApplication {
    id?: number;
    job_id: number;
    freelancer_id: number;
    cover_letter: string;
    status?: string; // Defaults to 'pending'
    created_at?: Date;
}
