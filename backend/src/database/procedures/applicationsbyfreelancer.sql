CREATE PROCEDURE spGetApplicationsByFreelancer
    @freelancer_id INT
AS
BEGIN
    SELECT * FROM JobApplications WHERE freelancer_id = @freelancer_id;
END
