CREATE PROCEDURE spCreateJob
    @client_id INT,
    @title VARCHAR(255),
    @description TEXT,
    @required_skills TEXT,
    @budget DECIMAL(10,2),
    @deadline DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Jobs (client_id, title, description, required_skills, budget, deadline, status, created_at)
    VALUES (@client_id, @title, @description, @required_skills, @budget, @deadline, 'open', GETDATE());
END;
