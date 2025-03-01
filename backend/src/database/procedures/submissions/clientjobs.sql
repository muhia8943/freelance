CREATE PROCEDURE spGetClientJobs
    @client_id INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT j.id, j.title, j.description, j.status, j.created_at
    FROM Jobs j
    WHERE j.client_id = @client_id;
END;
