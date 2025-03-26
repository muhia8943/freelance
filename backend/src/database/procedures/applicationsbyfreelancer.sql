CREATE PROCEDURE spGetApplicationsByFreelancer
    @freelancer_id INT
AS
BEGIN
    SELECT * FROM JobApplications WHERE freelancer_id = @freelancer_id;
END
go 

ALTER PROCEDURE spGetApplicationsByFreelancer
    @freelancer_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        ja.id AS application_id,
        ja.job_id,
        ja.freelancer_id,
        ja.cover_letter,
        ja.status,
        ja.created_at,
        ja.submission_url,
        j.title AS job_title,
        j.description AS job_description,
        j.budget AS job_budget,
        j.client_id AS job_client_id
    FROM JobApplications ja  -- ✅ Corrected Table Name
    INNER JOIN Jobs j ON ja.job_id = j.id  -- ✅ Ensure Jobs table exists
    WHERE ja.freelancer_id = @freelancer_id;
END;
