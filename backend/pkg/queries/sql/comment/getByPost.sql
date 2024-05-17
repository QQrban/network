SELECT c.ID, c.aboutID, c.authorID, c.content, c.images, c.created, u.*
FROM post c
    JOIN user u on u.ID = c.authorID
WHERE aboutID = ?
ORDER BY c.ID DESC
;
