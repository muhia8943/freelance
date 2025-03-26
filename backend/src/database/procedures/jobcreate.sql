CREATE PROCEDURE spCreateJob
    @client_id INT,
    @title NVARCHAR(255),
    @description TEXT,
    @required_skills TEXT,
    @budget DECIMAL(10,2),
    @deadline DATE = NULL,
    @coverPhoto NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Jobs (client_id, title, description, required_skills, budget, deadline, coverPhoto, created_at)
    VALUES (@client_id, @title, @description, @required_skills, @budget, @deadline, @coverPhoto, GETDATE());
END;

drop PROCEDURE if EXISTS spCreateJob;