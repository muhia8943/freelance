CREATE PROCEDURE spDeleteApplication
    @application_id INT
AS
BEGIN
    DELETE FROM JobApplications WHERE id = @application_id;
END
