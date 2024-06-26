SELECT gm.*, u.ID, u.firstname, u.lastname, u.nickname, u.image
FROM groupMessage gm
    JOIN user u on u.ID = gm.senderID
WHERE (?3 = 0 OR gm.ID < ?3)
  AND groupID = ?2
  AND senderID != 0
ORDER BY gm.ID ASC;
