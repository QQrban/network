SELECT p.*, u.*
FROM post p
         JOIN user u on u.ID = p.authorID
WHERE (?3 < 1 OR p.ID < ?3)
  AND groupID IS NULL
  AND p.authorID = ?2
  AND ( -- Filter out posts based on permission
            ?1 = ?2 OR -- Is author
            (p.privacy = 'public') OR -- AND (u.private = FALSE OR EXISTS(SELECT * FROM follow WHERE followingID = ?2 AND followerID = ?1))) OR
            (p.privacy = 'private' AND EXISTS(SELECT * FROM follow WHERE followeeID = ?2 AND followerID = ?1)) OR
            (p.privacy = 'manual' AND EXISTS(SELECT * FROM postAllowedUser WHERE postID = p.ID AND userID = ?1))
    )
ORDER BY p.ID DESC
LIMIT 20;
