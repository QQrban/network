WITH following AS (SELECT followeeID
                   FROM follow f
                   WHERE f.followerID = ?1)

SELECT p.*, u.*
FROM post p
         JOIN user u on u.ID = p.authorID
WHERE (?2 < 1 OR p.ID < ?2)
  AND groupID IS NULL
  AND ( -- Filter out posts based on permission
            p.authorID = ?1 OR -- Is author
            (p.privacy = 'public') OR -- AND (u.private = FALSE OR p.authorID IN following)) OR
            (p.privacy = 'private' AND p.authorID IN following) OR
            (p.privacy = 'manual' AND EXISTS(SELECT * FROM postAllowedUser WHERE postID = p.ID AND userID = ?1))
    )
ORDER BY p.ID DESC
LIMIT 20;
