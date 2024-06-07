CREATE TABLE `post`
(
    `ID`       INTEGER PRIMARY KEY AUTOINCREMENT,
    `authorID` INTEGER NOT NULL,
    `groupID`  INTEGER,
    `content`  TEXT    NOT NULL,
    `status`   TEXT    NOT NULL DEFAULT 'public',
    `images`   TEXT    NOT NULL DEFAULT '',
    `aboutID`  INTEGER,
    `created`  DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    --`edited`   DATE    NOT NULL DEFAULT '',

    CHECK (status IN ('public', 'private', 'manual')),
    FOREIGN KEY (authorID) REFERENCES user (ID) ON DELETE CASCADE,
    FOREIGN KEY (groupID) REFERENCES `group` (ID) ON DELETE CASCADE,
    FOREIGN KEY (aboutID) REFERENCES post (ID) ON DELETE CASCADE
);


CREATE INDEX IF NOT EXISTS post_author_index
    ON post (authorID);

CREATE INDEX IF NOT EXISTS post_group_index
    ON post (groupID);

CREATE INDEX IF NOT EXISTS comment_index
    ON post (aboutID);
