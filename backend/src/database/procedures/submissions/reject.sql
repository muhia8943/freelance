CREATE PROCEDURE spRejectJobWork
    @submission_id INT,
    @reason TEXT
AS
BEGIN
    UPDATE JobSubmissions
    SET status = 'rejected', notes = @reason
    WHERE id = @submission_id;
END
