WITH following AS (SELECT followeeID
                   FROM follow f
                   WHERE f.followerID = ?1)

SELECT p.*, u.*
FROM post p
         JOIN user u ON u.ID = p.authorID
WHERE (?2 < 1 OR p.ID < ?2)
  AND groupID IS NULL
  AND aboutID IS NULL
  AND p.authorID IN following
  AND ( -- Filter out posts based on permission
            p.status = 'public' OR
            p.status = 'private' OR
            (p.status = 'manual' AND EXISTS(SELECT * FROM postAllowedUser WHERE postID = p.ID AND userID = ?1))
    )
ORDER BY p.ID DESC
LIMIT 20;
