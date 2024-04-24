CREATE TABLE postAllowedUser
(
    `postID`  INTEGER NOT NULL,
    `userID`  INTEGER NOT NULL,
    `created` DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (postID, userID) ON CONFLICT REPLACE,
    FOREIGN KEY (postID) REFERENCES post (ID),
    FOREIGN KEY (userID) REFERENCES user (ID)
);

-- This trigger checks if the user is follower of post author.
-- If not, remove the matching row instead of inserting.
CREATE TRIGGER postAllowedUser_remove_if_not_follower
    BEFORE INSERT ON postAllowedUser
    WHEN (SELECT COUNT(*) FROM follow WHERE followeeID = (SELECT authorID FROM post WHERE post.ID = NEW.postID) AND followerID = NEW.userID) = 0
BEGIN
    -- Delete existing row if user is not follower of post author.
    DELETE FROM postAllowedUser
    WHERE postID = NEW.postID AND userID = NEW.userID;

    -- And don't insert the given row.
    SELECT RAISE(IGNORE);
END;
