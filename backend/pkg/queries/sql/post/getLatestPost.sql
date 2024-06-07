SELECT p.*, u.* 
FROM post p
JOIN user u ON u.ID = p.authorID 
WHERE authorID = ? 
AND p.aboutID IS NULL
ORDER BY ID DESC 
LIMIT 1;