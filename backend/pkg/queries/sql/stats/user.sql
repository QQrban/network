SELECT 
	(SELECT COUNT(*) FROM post WHERE authorID=?1 AND aboutID IS NULL) AS posts,
	(SELECT COUNT(*) FROM post WHERE authorID=?1 AND aboutID IS NOT NULL) AS comments,
	(SELECT COUNT(*) FROM post JOIN post AS comm ON post.ID=comm.aboutID WHERE comm.authorID=?1) AS commented,
	(SELECT COUNT(*) FROM "like" JOIN post ON post.ID=postID WHERE authorID=?1) AS likes,
	(SELECT COUNT(*) FROM "like" JOIN post ON post.ID=postID WHERE userID=?1) AS liked,
	(SELECT COUNT(*) FROM groupMember WHERE userID=?1 AND response='accept') AS groups,
	(SELECT COUNT(*) FROM follow WHERE followeeID=?1 AND response='accept') AS followers,
	(SELECT COUNT(*) FROM follow WHERE followerID=?1 AND response='accept') AS following,
	(SELECT COUNT(*) FROM eventMember WHERE userID=?1) AS events;
