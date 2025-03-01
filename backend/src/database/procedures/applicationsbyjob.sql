CREATE PROCEDURE spGetApplicationsByJob
    @job_id INT
AS
BEGIN
    SELECT * FROM JobApplications WHERE job_id = @job_id;
END
