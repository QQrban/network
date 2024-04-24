CREATE TABLE `post`
(
    `ID`       INTEGER PRIMARY KEY AUTOINCREMENT,
    `authorID` INTEGER NOT NULL,
    `groupID`  INTEGER,
    `aboutID`  INTEGER,
    `content`  TEXT    NOT NULL,
    `status`   TEXT    NOT NULL DEFAULT 'public' CHECK (status IN ('public', 'private', 'manual')),
    `created`  DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `edited`   DATE    NOT NULL DEFAULT '',

    FOREIGN KEY (authorID) REFERENCES user (ID)
    FOREIGN KEY (groupID) REFERENCES `group` (ID)
    FOREIGN KEY (aboutID) REFERENCES post (ID)
);

CREATE INDEX IF NOT EXISTS post_author_index
    ON post (authorID);

CREATE INDEX IF NOT EXISTS post_group_index
    ON post (groupID);

CREATE INDEX IF NOT EXISTS comment_index
    ON post (aboutID);
