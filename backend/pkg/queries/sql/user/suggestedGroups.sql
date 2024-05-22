SELECT g.*
FROM (
    SELECT DISTINCT gm.groupID 
    FROM groupMember gm
    WHERE gm.userID != ?1
    AND memberID != ?1 
    ORDER BY random()
    LIMIT 3
) sub
JOIN "group" g ON sub.groupID = g.ID;