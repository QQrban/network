SELECT count(*) != 0 AS isFollowing
FROM follow
WHERE followerID = ?1
  AND followeeID = ?2;
