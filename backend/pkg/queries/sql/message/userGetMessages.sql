SELECT *
FROM userMessage
WHERE (?3 = 0 OR ID < ?3)
  AND ((senderID = ?1 AND receiverID = ?2)
    OR (senderID = ?2 AND receiverID = ?1))
ORDER BY ID DESC
LIMIT 10;
