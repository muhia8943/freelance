CREATE PROCEDURE spApplyForJob
    @job_id INT,
    @freelancer_id INT,
    @cover_letter TEXT
AS
BEGIN
    INSERT INTO JobApplications (job_id, freelancer_id, cover_letter, created_at)
    VALUES (@job_id, @freelancer_id, @cover_letter, GETDATE());
END
