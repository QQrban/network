CREATE TABLE eventMember
(
    `eventID` INTEGER NOT NULL,
    `userID`  INTEGER NOT NULL,
    `option`  INTEGER, --CHECK ( status IN ('GOING', 'NOT_GOING')),
    `created` DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (eventID, userID) ON CONFLICT REPLACE,
    FOREIGN KEY (eventID) REFERENCES event (ID),
    FOREIGN KEY (userID) REFERENCES user (ID)
);

-- This trigger checks if the inserted option is null.
-- If so, remove the matching row instead of inserting.
CREATE TRIGGER eventMember_remove_if_null
    BEFORE INSERT ON eventMember
    WHEN NEW.option IS NULL
BEGIN
    -- Delete existing row if option is null.
    DELETE FROM eventMember
    WHERE eventID = NEW.eventID AND userID = NEW.userID;

    -- And don't insert the given row.
    SELECT RAISE(IGNORE);
END;

-- If a user leaves a group, remove them from that group's events (+ with future deadlines)
CREATE TRIGGER group_leave_events
    AFTER DELETE ON groupMember
BEGIN
    DELETE FROM eventMember
    WHERE (SELECT groupID FROM event e WHERE e.ID = eventMember.eventID) = OLD.groupID AND
          eventMember.userID = OLD.userID AND
          (SELECT time FROM event e WHERE e.ID = eventMember.eventID) > CURRENT_TIMESTAMP;
END;
