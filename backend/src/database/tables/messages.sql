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