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
