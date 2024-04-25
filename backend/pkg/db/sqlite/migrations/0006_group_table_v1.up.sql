CREATE TABLE `group`
(
    `ID` INTEGER PRIMARY KEY AUTOINCREMENT,
    `ownerID` INTEGER NOT NULL,
    `title`    TEXT    NOT NULL,
    `description`   TEXT    NOT NULL,
    FOREIGN KEY (ownerID) REFERENCES user (ID),
    UNIQUE (ownerID, title)
);
