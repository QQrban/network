SELECT user.* FROM follow f
JOIN user ON f.followerID = user.ID
WHERE f.followeeID = ?;
