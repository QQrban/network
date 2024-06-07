CREATE TABLE notification
(
   `ID`         INTEGER PRIMARY KEY AUTOINCREMENT,
   `type`       TEXT    NOT NULL,
   `action`     TEXT    NOT NULL,
   `senderID`   INTEGER NOT NULL,
   `receiverID` INTEGER NOT NULL,
   `elementID`  INTEGER NOT NULL,
   `isGroup`    BOOLEAN NOT NULL DEFAULT FALSE,
   --`userID`     INTEGER,
   --`groupID`    INTEGER,
   --`eventID`    INTEGER,
   --`postID`     INTEGER,
   `seen`       BOOLEAN NOT NULL DEFAULT FALSE
);