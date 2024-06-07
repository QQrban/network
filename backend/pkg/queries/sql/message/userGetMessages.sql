SELECT um.*, u.ID, u.firstname, u.lastname, u.nickname, u.image
FROM userMessage um
JOIN user u ON um.senderID = u.ID
WHERE (?3 = 0 OR um.ID < ?3)
  AND ((senderID = ?1 AND receiverID = ?2)
    OR (senderID = ?2 AND receiverID = ?1))
ORDER BY um.ID ASC;
