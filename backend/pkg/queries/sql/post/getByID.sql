SELECT p.*, u.*
FROM post p
         JOIN user u on u.ID = p.authorID
WHERE p.ID = ?1;
