CREATE PROCEDURE spGetCompletedJobs
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * 
    FROM Jobs 
    WHERE status = 'completed';
END;

GO

EXEC spGetCompletedJobs;
