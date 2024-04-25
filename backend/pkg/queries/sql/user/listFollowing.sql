SELECT user.* FROM follow f
JOIN user ON f.followeeID = user.ID
WHERE f.followerID = ?;
