DELETE
FROM follow
WHERE followerID = ?1
  AND followeeID = ?2;
