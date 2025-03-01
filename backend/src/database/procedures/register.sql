CREATE PROCEDURE spRegisterUser
    @username NVARCHAR(50),
    @password NVARCHAR(255),
    @email NVARCHAR(100),
    @role NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    -- Validate role
    IF @role NOT IN ('client', 'user', 'admin')
    BEGIN
        RAISERROR('Invalid role specified', 16, 1);
        RETURN;
    END

    -- Check if username exists
    IF EXISTS (SELECT 1 FROM Users WHERE Username = @username)
    BEGIN
        RAISERROR('Username already exists', 16, 1);
        RETURN;
    END

    -- Check if email exists
    IF EXISTS (SELECT 1 FROM Users WHERE Email = @email)
    BEGIN
        RAISERROR('Email already exists', 16, 1);
        RETURN;
    END

    -- Insert user
    INSERT INTO Users (Username, PasswordHash, Email, Role, CreatedAt, UpdatedAt)
    VALUES (@username, @password, @email, @role, GETDATE(), GETDATE());
END;

DROP PROCEDURE IF EXISTS spRegisterUser;
