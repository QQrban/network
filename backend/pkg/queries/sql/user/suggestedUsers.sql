WITH following AS (
  SELECT followeeID
  FROM follow
  WHERE followerID = ?1 OR followeeID = ?1
)

SELECT * FROM user u 
WHERE u.ID NOT IN following
ORDER BY random()
LIMIT 3