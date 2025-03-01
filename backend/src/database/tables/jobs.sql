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
