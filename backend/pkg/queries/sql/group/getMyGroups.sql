SELECT g.*, 
(gm.response IS NOT NULL AND gm.response = 'accept') AS IncludesMe, 
(gm.response IS NOT NULL AND gm.response = 'pending') AS PendingRequest
FROM "group" g
    JOIN groupMember gm on g.ID = gm.groupID AND gm.userID = ?1;
WHERE gm.response = 'accept' OR gm.response = 'pending';
