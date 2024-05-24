CREATE TABLE event
(
    `ID`       INTEGER PRIMARY KEY AUTOINCREMENT,
    `groupID`  INTEGER NOT NULL,
    `authorID` INTEGER NOT NULL,
    `title`       TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `time`        DATE NOT NULL, -- time of event or deadline
    `options`     TEXT DEFAULT 'Going,Not going', -- comma-separated list of options
    --`type`        TEXT NOT NULL DEFAULT 'radio' CHECK (type IN ('radio', 'checkbox')),
    `created`     DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (groupID) REFERENCES "group" (ID) ON DELETE CASCADE,
    FOREIGN KEY (authorID) REFERENCES user (ID) ON DELETE RESTRICT
);
