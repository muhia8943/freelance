CREATE PROCEDURE spUpdateUser
    @id INT,
    @username VARCHAR(50),
    @email VARCHAR(100),
    @role VARCHAR(20),
    @phoneNumber NVARCHAR(20),
    @profilePicture NVARCHAR(255),
    @skills TEXT,
    @bio TEXT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET
        Username = @username,
        Email = @email,
        Role = @role,
        phonenumber = @phoneNumber,
        profile_picture = @profilePicture,
        skills = @skills,
        bio = @bio,
        UpdatedAt = GETDATE()
    WHERE
        UserID = @id;

    SELECT @@ROWCOUNT AS RowsAffected;
END;

 go

 DROP PROCEDURE IF EXISTS spUpdateUser;
 go 

 SELECT COLUMN_NAME, COLUMN_DEFAULT, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'Role';
 go 

DROP PROCEDURE IF EXISTS spUpdateUser;