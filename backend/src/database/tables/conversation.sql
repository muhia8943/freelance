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