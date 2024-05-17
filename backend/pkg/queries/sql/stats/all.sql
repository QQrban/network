SELECT 
	(SELECT COUNT(*) FROM user) AS users,
	(SELECT COUNT(*) FROM post WHERE aboutID IS NULL) AS posts,
	(SELECT COUNT(*) FROM post WHERE aboutID IS NOT NULL) AS comments,
	(SELECT COUNT(*) FROM "group") AS groups,
	(SELECT COUNT(*) FROM "event") AS events;
