CREATE PROCEDURE spUpdateApplicationStatus
    @application_id INT,
    @status VARCHAR(20)
AS
BEGIN
    UPDATE JobApplications
    SET status = @status
    WHERE id = @application_id;
END
