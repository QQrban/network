CREATE TABLE groupMember
(
    `groupID`   INTEGER NOT NULL,
    `userID`    INTEGER NOT NULL, -- The user who is invited or who requests
    `memberID`  INTEGER, -- The user who invited or owner if request
    `type`      TEXT NOT NULL CHECK (type IN ('invite', 'request')),
    `presented` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `responded` DATE NOT NULL DEFAULT '',
    `response`  TEXT NOT NULL DEFAULT 'pending' CHECK (response IN ('accept', 'pending', 'reject')),

    FOREIGN KEY (groupID)  REFERENCES `group` (ID) ON DELETE CASCADE,
    FOREIGN KEY (userID)   REFERENCES `user`  (ID) ON DELETE CASCADE,
    FOREIGN KEY (memberID) REFERENCES `user`  (ID) ON DELETE RESTRICT,

    UNIQUE (groupID, userID) ON CONFLICT REPLACE
);

CREATE INDEX groupMember_reverse
    ON groupMember (userID, groupID);

-- When request is made to join a group, insert group owner ID as memberID
-- CREATE TRIGGER groupMember_insert
--     BEFORE INSERT ON groupMember
--     WHEN NEW.type = 'request'
--     BEGIN
--         INSERT INTO groupMember (groupID, userID, memberID, type)
--         VALUES (NEW.groupID, NEW.userID, (SELECT ownerID FROM "group" g WHERE g.ID = NEW.groupID), 'request');
--     END;

CREATE TRIGGER group_owner_leave
    BEFORE DELETE ON groupMember
    WHEN (SELECT ownerID FROM "group" g WHERE g.ID = OLD.groupID) = OLD.userID
    BEGIN
        SELECT RAISE(ROLLBACK, 'Owner of the group cannot leave');
    END;
