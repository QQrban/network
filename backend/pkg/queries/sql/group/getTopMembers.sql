SELECT u.*
FROM "group" g
     JOIN groupMember gm ON g.ID = gm.groupID
     JOIN user u ON gm.userID = u.ID
     JOIN post p ON p.groupID = g.ID AND p.authorID = u.ID
WHERE g.ID = ?
GROUP BY u.ID
ORDER BY COUNT(p.ID) DESC
LIMIT 3;
