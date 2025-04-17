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


CREATE TABLE Payments (
    id INT IDENTITY(1,1) PRIMARY KEY,
    job_id INT NOT NULL,
    client_id INT NOT NULL,
    freelancer_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,  -- From PayPal
    payment_method VARCHAR(50) DEFAULT 'PayPal',
    payment_status VARCHAR(20) DEFAULT 'completed',  -- could be 'pending', 'failed', etc.
    paid_at DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (job_id) REFERENCES Jobs(id),
    FOREIGN KEY (client_id) REFERENCES Users(UserID),
    FOREIGN KEY (freelancer_id) REFERENCES Users(UserID)
);


CREATE TABLE Jobs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    client_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    required_skills TEXT NOT NULL,
    budget DECIMAL(10,2) NOT NULL,
    deadline DATE NULL,
    status VARCHAR(20) CHECK (status IN ('open', 'in progress', 'completed', 'cancelled')) DEFAULT 'open',
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (client_id) REFERENCES Users(UserID ) ON DELETE CASCADE
);

ALTER TABLE Jobs ADD 
    completed_at DATETIME NULL, 
    completed_by INT NULL, 
    completion_notes TEXT NULL,
    FOREIGN KEY (completed_by) REFERENCES Users(UserID);
GO
ALTER TABLE Jobs 
ADD coverPhoto VARCHAR(255) NULL;
GO
ALTER TABLE Jobs 
ADD payment_status VARCHAR(20) NOT NULL DEFAULT 'not paid' 
    CHECK (payment_status IN ('not paid', 'paid'));
GO
ALTER TABLE Jobs
ADD ratings DECIMAL(2,1) NULL
    CHECK (ratings >= 1.0 AND ratings <= 5.0);
