SELECT p.*, u.*, g.*
FROM groupMember gM
  JOIN post p ON p.groupID = gM.groupID
  JOIN user u ON u.ID = p.authorID
  JOIN "group" g on gM.groupID = g.ID
WHERE (?2 < 1 OR p.ID < ?2)
  AND gM.userID = ?1
ORDER BY p.ID DESC
LIMIT 20;
