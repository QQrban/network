SELECT DISTINCT g.* FROM "group" g
JOIN groupMember gm ON g.ID = gm.groupID
WHERE gm.userID != ?1
ORDER BY random()
LIMIT 3
