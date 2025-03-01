CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Role VARCHAR(20) NOT NULL,
    phonenumber VARCHAR(20) NULL, -- Fixed missing data type
    profile_picture TEXT NULL, -- Changed to TEXT for longer URLs
    skills TEXT NULL, -- Only for freelancers
    bio TEXT NULL,
    CreatedAt DATETIME DEFAULT GETDATE() NOT NULL,
    UpdatedAt DATETIME DEFAULT GETDATE() NOT NULL
);
drop TABLE Users