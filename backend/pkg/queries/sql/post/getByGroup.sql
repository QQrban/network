SELECT p.*, u.*
FROM post p
         JOIN user u on u.ID = p.authorID
WHERE (?2 < 1 OR p.ID < ?2)
  AND groupID = ?1
ORDER BY p.ID DESC
LIMIT 20;
