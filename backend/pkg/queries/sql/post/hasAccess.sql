-- This is a mess, I'm sorry for anyone reading this >_<

WITH following AS (SELECT followeeID FROM follow f WHERE f.followerID = ?1)

SELECT count(*) != 0
FROM post p
WHERE p.ID = ?2
  AND p.aboutID IS NULL 
  AND (
        (p.groupID IS NOT NULL) -- AND EXISTS(SELECT * FROM groupMember WHERE groupID = p.groupID AND userID = ?1))
        OR (p.groupID IS NULL AND (
                ?1 = p.authorID OR
                (p.status = 'public') OR
                (p.status = 'private' AND p.authorID IN following) OR
                (p.status = 'manual' AND EXISTS(SELECT * FROM postAllowedUser WHERE postID = p.ID AND userID = ?1))
        ))
    );
