create database lincoln

CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Role VARCHAR(20) NOT NULL,
    phonenumber VARCHAR(20) NULL, -- Fixed missing data type
    profile_picture TEXT NULL, -- CShanged to TEXT for longer URLs
    skills TEXT NULL, -- Only for freelancers
    bio TEXT NULL,
    CreatedAt DATETIME DEFAULT GETDATE() NOT NULL,
    UpdatedAt DATETIME DEFAULT GETDATE() NOT NULL
);
drop TABLE Users
GO
EXEC sp_help 'Users';


CREATE TABLE JobSubmissions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    job_id INT NOT NULL,
    freelancer_id INT NOT NULL,
    submission_link VARCHAR(500), -- Link to submitted work (e.g., Google Drive, GitHub)
    notes TEXT,
    submitted_at DATETIME DEFAULT GETDATE(),
    status VARCHAR(20) CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    FOREIGN KEY (job_id) REFERENCES Jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (freelancer_id) REFERENCES Users(UserID)
);

go

select * FROM JobSubmissions


CREATE TABLE Messages (
    id INT PRIMARY KEY IDENTITY(1,1),
    conversation_id INT NOT NULL,
    sender_id INT NOT NULL,
    message_text NVARCHAR(MAX) NOT NULL,
    sent_at DATETIME DEFAULT GETDATE(),
    is_read BIT DEFAULT 0,
    FOREIGN KEY (conversation_id) REFERENCES Conversations(id),
    FOREIGN KEY (sender_id) REFERENCES Users(UserID)
);

CREATE TABLE JobApplications (
    id INT IDENTITY(1,1) PRIMARY KEY,
    job_id INT NOT NULL,
    freelancer_id INT NOT NULL,
    cover_letter TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (job_id) REFERENCES Jobs(id) ON DELETE NO ACTION,
    FOREIGN KEY (freelancer_id) REFERENCES Users(UserID) ON DELETE NO ACTION
);

ALTER TABLE JobApplications ADD submission_url NVARCHAR(255) NULL;


CREATE TABLE Conversations (
    id INT PRIMARY KEY IDENTITY(1,1),
    client_id INT NOT NULL,
    freelancer_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (client_id) REFERENCES Users(UserID),
    FOREIGN KEY (freelancer_id) REFERENCES Users(UserID)
);
go 
SELECT * FROM Conversations
go 
DELETE FROM Conversations