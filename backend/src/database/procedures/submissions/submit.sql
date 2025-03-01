CREATE PROCEDURE spSubmitJobWork
    @job_id INT,
    @freelancer_id INT,
    @submission_link NVARCHAR(500),
    @notes TEXT
AS
BEGIN
    INSERT INTO JobSubmissions (job_id, freelancer_id, submission_link, notes)
    VALUES (@job_id, @freelancer_id, @submission_link, @notes);
END
