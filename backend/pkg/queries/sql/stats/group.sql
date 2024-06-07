SELECT 
	(SELECT COUNT(*) FROM groupMember WHERE groupID=?1 AND response="accept") AS members,
	(SELECT COUNT(*) FROM post WHERE groupID=?1 AND aboutID IS NULL) AS posts,
	(SELECT COUNT(*) FROM post JOIN post AS comm ON post.ID=comm.aboutID WHERE post.groupID=?1) AS comments,
	(SELECT COUNT(*) FROM "event" WHERE groupID=?1) AS events,
	(SELECT COUNT(*) FROM eventMember JOIN event ON event.ID=eventID WHERE groupID=?1) AS eventResponses;
