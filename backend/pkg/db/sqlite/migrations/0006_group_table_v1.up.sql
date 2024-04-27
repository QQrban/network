CREATE TABLE `group`
(
    `ID` INTEGER PRIMARY KEY AUTOINCREMENT,
    `ownerID`     INTEGER NOT NULL,
    `title`       TEXT    NOT NULL,
    `description` TEXT    NOT NULL,
    `created`     DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ownerID) REFERENCES user (ID),
    UNIQUE (ownerID, title)
);
