CREATE PROCEDURE spGetAllSubmissions
AS
BEGIN
    SET NOCOUNT ON;
    SELECT ja.id, ja.job_id, ja.freelancer_id, ja.submission_url, ja.status, 
           j.title AS job_title, u.username AS freelancer_name
    FROM JobApplications ja
    JOIN Jobs j ON ja.job_id = j.id
    JOIN Users u ON ja.freelancer_id = u.UserID;
END;


DROP PROCEDURE if exists spGetallSubmissions