CREATE TABLE `user`
(
    `ID`        INTEGER PRIMARY KEY AUTOINCREMENT,
    `email`     TEXT NOT NULL UNIQUE COLLATE NOCASE,
    `password`  TEXT NOT NULL,
    `firstname` TEXT NOT NULL,
    `lastname`  TEXT NOT NULL,
    `nickname`  TEXT NOT NULL DEFAULT '',
    `about`     TEXT NOT NULL DEFAULT '',
    `image`     TEXT,
    `birthday`  DATE NOT NULL DEFAULT '',
    `private`   BOOLEAN NOT NULL DEFAULT FALSE, -- profile visibility
    `country`   TEXT NOT NULL DEFAULT '',
    `created`   DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
    --`updated`   DATE NOT NULL DEFAULT '',

    --FOREIGN KEY (`image`) REFERENCES "image" (token)
);

INSERT INTO user
(ID, password, firstname, lastname, nickname, email)
VALUES
(0, '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'System', 'User', 'sys', 'sys@kood.ee');