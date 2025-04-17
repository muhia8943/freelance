CREATE PROCEDURE spGetCompletedJobsByClientId
    @client_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * 
    FROM Jobs  
    WHERE status = 'completed' AND client_id = @client_id;
END;
