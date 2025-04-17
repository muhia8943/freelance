CREATE PROCEDURE spApproveJobWork
    @submission_id INT,
    @client_id INT
AS
BEGIN
    DECLARE @job_id INT;
    DECLARE @freelancer_id INT;
    
    -- Get the job ID and freelancer ID from the submission
    SELECT @job_id = job_id, @freelancer_id = freelancer_id 
    FROM JobSubmissions 
    WHERE id = @submission_id;

    -- ✅ Mark job as completed by the freelancer
    UPDATE Jobs
    SET status = 'completed', completed_at = GETDATE(), completed_by = @freelancer_id
    WHERE id = @job_id;

    -- ✅ Update submission status
    UPDATE JobSubmissions
    SET status = 'approved'
    WHERE id = @submission_id;
END

 GO
 DROP PROCEDURE spApproveJobWork 