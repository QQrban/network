WITH myGroups AS (
    SELECT DISTINCT gm.groupID 
    FROM groupMember gm
    WHERE gm.userID = ?1
    OR memberID = ?1 
) 
SELECT g.* FROM "group" g
WHERE g.ID NOT IN myGroups
ORDER BY random()
LIMIT 3;