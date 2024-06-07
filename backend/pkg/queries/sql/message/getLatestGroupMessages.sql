SELECT gm.*
FROM groupMessage gm
JOIN groupMember gmbr ON gmbr.groupID = gm.groupID 
   AND gmbr.userID = ?1
LEFT JOIN latestGroupMessage lgm 
ON (lgm.userID = gmbr.userID AND lgm.groupID = gm.groupID)
WHERE gm.senderID != ?1
AND gmbr.response = 'accept'
AND (lgm.messageID IS NULL OR gm.ID > lgm.messageID)
ORDER BY gm.ID DESC;
