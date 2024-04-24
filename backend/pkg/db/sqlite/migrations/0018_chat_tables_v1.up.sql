CREATE TABLE messageUser
(
    `ID`         INTEGER PRIMARY KEY AUTOINCREMENT,
    `senderID`   INTEGER NOT NULL,
    `receiverID` INTEGER NOT NULL,
    `content`    TEXT    NOT NULL,
    `created`    DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `edited`     DATE    NOT NULL DEFAULT '',
    FOREIGN KEY (senderID) REFERENCES `user` (ID),
    FOREIGN KEY (receiverID) REFERENCES `user` (ID)
);

CREATE INDEX messageUser_SR
    ON messageUser (senderID, receiverID);

CREATE INDEX messageUser_RS
    ON messageUser (receiverID, senderID);

CREATE TABLE messageGroup
(
    `ID`        INTEGER PRIMARY KEY AUTOINCREMENT,
    `senderID`  INTEGER NOT NULL,
    `groupID`   INTEGER NOT NULL,
    `content`   TEXT    NOT NULL,
    `created`   DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `edited`    DATE    NOT NULL DEFAULT '',
    FOREIGN KEY (senderID) REFERENCES `user` (ID),
    FOREIGN KEY (groupID) REFERENCES `group` (ID)
);

CREATE INDEX messageGroup_SR
    ON messageGroup (senderID, groupID);

CREATE INDEX messageGroup_RS
    ON messageGroup (groupID, senderID);
