WITH following AS (
  SELECT followeeID
  FROM follow
  WHERE followerID = ?1 OR followeeID = ?1
)

SELECT DISTINCT * FROM user u 
WHERE u.ID NOT IN following 
AND u.ID != 0
ORDER BY random()
LIMIT 3