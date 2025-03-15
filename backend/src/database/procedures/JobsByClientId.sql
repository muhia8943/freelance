CREATE PROCEDURE spGetJobsByClientId
    @client_id INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM Jobs WHERE client_id = @client_id;
END;
