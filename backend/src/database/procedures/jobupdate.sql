CREATE PROCEDURE spUpdateJob
    @id INT,
    @title VARCHAR(255) = NULL,
    @description TEXT = NULL,
    @required_skills TEXT = NULL,
    @budget DECIMAL(10,2) = NULL,
    @deadline DATE = NULL,
    @status VARCHAR(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Jobs
    SET
        title = COALESCE(@title, title),
        description = COALESCE(@description, description),
        required_skills = COALESCE(@required_skills, required_skills),
        budget = COALESCE(@budget, budget),
        deadline = COALESCE(@deadline, deadline),
        status = COALESCE(@status, status)
    WHERE id = @id;
END;
