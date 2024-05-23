SELECT um.*
FROM userMessage um
LEFT JOIN latestNotification ln ON ln.userID = um.receiverID
WHERE um.senderID = 0 AND um.receiverID = ?1 AND (ln.messageID IS NULL OR um.ID > ln.messageID)
ORDER BY um.ID DESC;
