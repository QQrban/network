SELECT um.*
FROM userMessage um
LEFT JOIN latestNotification ln ON ln.userID = ?1
WHERE senderID = 0 AND receiverID = ?1 AND (ln.messageID IS NULL OR um.ID > ln.messageID)
ORDER BY ID DESC;
