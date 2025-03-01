CREATE PROCEDURE spLoginUser
    @Email NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Select user by email
    SELECT UserID AS id, Username, PasswordHash AS password, Role
    FROM Users
    WHERE Email = @Email;
END
