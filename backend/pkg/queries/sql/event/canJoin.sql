SELECT EXISTS(SELECT * FROM groupMember gm WHERE gm.groupID = g.ID AND gm.userID = ?2 AND gm.response = 'accept') AS canJoin
FROM event e JOIN "group" g ON e.groupID = g.ID
WHERE e.ID = ?1;
