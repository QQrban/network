CREATE TABLE latestNotification
(
    `userID`     INTEGER NOT NULL,
    `messageID`  INTEGER NOT NULL,
    FOREIGN KEY (userID) REFERENCES `user` (ID),
    FOREIGN KEY (messageID) REFERENCES `message` (ID)
);

CREATE UNIQUE INDEX latestNotification_userID
    ON latestNotification (userID, messageID);