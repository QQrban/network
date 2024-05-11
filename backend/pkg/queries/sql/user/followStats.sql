SELECT (SELECT COUNT(*) FROM follow 
WHERE followeeID = $1 AND response = 'accept') AS followers,
(SELECT COUNT(*) FROM follow 
WHERE followerID = $1 AND response = 'accept') AS following;