SELECT um.*
FROM userMessage um
LEFT JOIN latestNotification ln ON ln.userID = um.receiverID
WHERE um.senderID = 0 AND um.receiverID = ?1
ORDER BY um.ID DESC;
