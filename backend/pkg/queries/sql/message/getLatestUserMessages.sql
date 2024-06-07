SELECT um.*
FROM userMessage um
LEFT JOIN latestUserMessage lum 
ON (lum.userID = um.receiverID AND lum.contactID = um.senderID)
WHERE um.receiverID = ?1
AND um.senderID != 0
AND (lum.messageID IS NULL OR um.ID > lum.messageID)
ORDER BY um.ID DESC;
