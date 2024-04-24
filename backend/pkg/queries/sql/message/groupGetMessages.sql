SELECT gm.*, u.userID, u.firstname, u.lastname, u.nickname, u.imageID
FROM groupMessage gm
    JOIN user u on u.ID = gm.senderID
WHERE (?3 = 0 OR gm.ID < ?3)
  AND groupID = ?2
ORDER BY gm.ID DESC
LIMIT 10;
