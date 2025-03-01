CREATE PROCEDURE spDeleteUser
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Delete the user from the Users table
    DELETE FROM Users
    WHERE UserID = @id;

    -- Optional: Check if a user was deleted
    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('User not found', 16, 1);
    END
END
