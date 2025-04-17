CREATE PROCEDURE spGetCompletedJobsByFreelancerId
    @completed_by INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT * FROM Jobs 
    WHERE status = 'completed' 
    AND completed_by = @completed_by;
END;
