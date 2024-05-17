CREATE TABLE follow
(
    `followerID` INTEGER NOT NULL,
    `followeeID` INTEGER NOT NULL,
    `created`    DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `responded`  DATE    NOT NULL DEFAULT '',
    `response`   TEXT    NOT NULL DEFAULT 'pending' CHECK (response IN ('accept', 'pending', 'reject')),

    UNIQUE (followerID, followeeID) ON CONFLICT REPLACE,
    CHECK (followerID != followeeID),
    FOREIGN KEY (followerID) REFERENCES user (ID),
    FOREIGN KEY (followeeID) REFERENCES user (ID)
);

CREATE INDEX follow_reverse
    ON follow (followeeID, followerID);

-- This trigger checks response type upon insertion
-- If followee's profile is private, response must be 'pending'
-- If followee's profile is public, response will be 'accept'
-- CREATE TRIGGER follow_response_check
-- AFTER INSERT ON follow
-- BEGIN
--     UPDATE follow
--     SET response = 'accept',
--         responded = CURRENT_TIMESTAMP
--     WHERE NEW.followeeID IN (
--         SELECT ID
--         FROM user
--         WHERE private = FALSE
--     );
-- END;

-- This trigger checks response type upon update
-- If followee's profile is private, response must be 'accept' or 'reject'
-- CREATE TRIGGER follow_response_update_check
-- AFTER UPDATE OF response ON follow
-- WHEN NEW.response = 'accept' OR NEW.response = 'reject'
-- BEGIN
--     UPDATE follow
--     SET responded = CURRENT_TIMESTAMP
--     WHERE followeeID IN (
--         SELECT ID
--         FROM user
--         WHERE private = TRUE
--     );
-- END;



