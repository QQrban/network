SELECT g.*
FROM "group" g
    JOIN groupMember gM on g.ID = gM.groupID AND gM.userID = ?1;
WHERE gm.response = 'accept';
