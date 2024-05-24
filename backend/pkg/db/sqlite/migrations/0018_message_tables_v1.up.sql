CREATE TABLE userMessage
(
    `ID`         INTEGER PRIMARY KEY AUTOINCREMENT,
    `senderID`   INTEGER NOT NULL,
    `receiverID` INTEGER NOT NULL,
    `content`    TEXT    NOT NULL,
    `created`    DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    --`edited`     DATE    NOT NULL DEFAULT '',
    FOREIGN KEY (senderID) REFERENCES `user` (ID) ON DELETE CASCADE,
    FOREIGN KEY (receiverID) REFERENCES `user` (ID) ON DELETE CASCADE
);

CREATE INDEX userMessage_SR
    ON userMessage (senderID, receiverID);

CREATE INDEX userMessage_RS
    ON userMessage (receiverID, senderID);

CREATE TABLE groupMessage
(
    `ID`        INTEGER PRIMARY KEY AUTOINCREMENT,
    `senderID`  INTEGER NOT NULL,
    `groupID`   INTEGER NOT NULL,
    `content`   TEXT    NOT NULL,
    `created`   DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    --`edited`    DATE    NOT NULL DEFAULT '',
    FOREIGN KEY (senderID) REFERENCES `user` (ID),
    FOREIGN KEY (groupID) REFERENCES `group` (ID)
);

CREATE INDEX groupMessage_SR
    ON groupMessage (senderID, groupID);

CREATE INDEX groupMessage_RS
    ON groupMessage (groupID, senderID);
