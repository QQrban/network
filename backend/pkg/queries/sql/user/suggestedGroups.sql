SELECT g.*
FROM (
    SELECT DISTINCT g.ID 
    FROM "group" g
    JOIN groupMember gm ON g.ID = gm.groupID
    WHERE gm.userID != ?1
    ORDER BY random()
    LIMIT 3
) sub
JOIN "group" g ON sub.ID = g.ID;