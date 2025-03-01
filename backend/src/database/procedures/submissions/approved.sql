CREATE PROCEDURE spApproveJobWork
    @submission_id INT,
    @client_id INT
AS
BEGIN
    DECLARE @job_id INT;
    
    SELECT @job_id = job_id FROM JobSubmissions WHERE id = @submission_id;

    -- Mark job as completed
    UPDATE Jobs
    SET status = 'completed', completed_at = GETDATE(), completed_by = @client_id
    WHERE id = @job_id;

    -- Update submission status
    UPDATE JobSubmissions
    SET status = 'approved'
    WHERE id = @submission_id;
END
