-- Lists following and users that have sent a message

WITH known AS (
    SELECT CASE WHEN senderID != ?1 THEN senderID ELSE receiverID END knownID, max(messageID) as sortKey
    FROM messageUser
    WHERE senderID = ?1
       OR receiverID = ?1
    GROUP BY knownID
    ORDER BY sortKey DESC
)

SELECT user.*
FROM (SELECT user.*
      FROM known k
               JOIN user on user.ID = k.knownID

      UNION

      SELECT user.*
      FROM follow f
               JOIN user ON f.followingID = user.ID
      WHERE f.followerID = ?1) user
LEFT JOIN known k ON user.ID = k.knownID
WHERE user.ID != 0
ORDER BY k.sortKey DESC;
