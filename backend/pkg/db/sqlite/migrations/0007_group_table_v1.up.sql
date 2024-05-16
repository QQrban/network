CREATE TABLE `group`
(
    `ID` INTEGER PRIMARY KEY AUTOINCREMENT,
    `ownerID`     INTEGER NOT NULL,
    `title`       TEXT    NOT NULL UNIQUE,
    `description` TEXT    NOT NULL,
    `created`     DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ownerID) REFERENCES user (ID),
    UNIQUE (ownerID, title) 
);

-- When a group is created, insert the owner as a member
CREATE TRIGGER group_owner_join
    AFTER INSERT ON `group`
    BEGIN
        INSERT INTO groupMember (groupID, userID, memberID, type, responded, response)
        VALUES (NEW.ID, NEW.ownerID, NEW.ownerID, 'request', CURRENT_TIMESTAMP, 'accept');
    END;