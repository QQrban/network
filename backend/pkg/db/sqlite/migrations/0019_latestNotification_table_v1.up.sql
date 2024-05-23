CREATE TABLE latestNotification
(
    `userID`     INTEGER NOT NULL UNIQUE ON CONFLICT REPLACE,
    `messageID`  INTEGER NOT NULL,
    FOREIGN KEY (userID) REFERENCES `user` (ID),
    FOREIGN KEY (messageID) REFERENCES `userMessage` (ID)
);
