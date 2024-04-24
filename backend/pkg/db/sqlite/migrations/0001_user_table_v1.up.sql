CREATE TABLE `user`
(
    `ID`        INTEGER PRIMARY KEY AUTOINCREMENT,
    `email`     TEXT NOT NULL UNIQUE COLLATE NOCASE,
    `password`  TEXT NOT NULL,
    `firstname` TEXT NOT NULL,
    `lastname`  TEXT NOT NULL,
    `nickname`  TEXT NOT NULL DEFAULT '',
    `about`     TEXT NOT NULL DEFAULT '',
    `imageID`   INTEGER,
    `birthday`  DATE NOT NULL DEFAULT '',
    `private`   BOOLEAN NOT NULL DEFAULT FALSE -- profile visibility
    `created`   DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated`   DATE NOT NULL DEFAULT '',

    FOREIGN KEY (imageID) REFERENCES `image` (ID)
);
