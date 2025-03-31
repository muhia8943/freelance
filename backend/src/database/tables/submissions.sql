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