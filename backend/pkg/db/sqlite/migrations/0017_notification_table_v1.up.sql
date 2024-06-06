CREATE TABLE notification
(
   `ID`        INTEGER PRIMARY KEY AUTOINCREMENT,
   `type`      TEXT    NOT NULL,
   `action`    TEXT    NOT NULL,
   `userID`    INTEGER,
   `groupID`   INTEGER,
   `eventID`   INTEGER,
   `postID`    INTEGER,
   `seen`      BOOLEAN NOT NULL DEFAULT FALSE
);