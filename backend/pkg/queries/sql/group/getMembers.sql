SELECT u.*
FROM "group" g
     JOIN groupMember gm ON g.ID = gm.groupID
     JOIN user u ON gm.userID = u.ID
WHERE g.ID = ?;
