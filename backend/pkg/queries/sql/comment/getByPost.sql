SELECT c.*, u.*
FROM post c
    JOIN user u on u.ID = c.authorID
WHERE aboutID = ?
ORDER BY c.ID DESC
;
