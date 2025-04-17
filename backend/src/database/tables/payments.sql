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
