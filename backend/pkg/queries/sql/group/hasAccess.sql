-- SELECT g.type = 'public' OR EXISTS(SELECT * FROM groupMember gm WHERE gm.groupID = ?1 AND gm.userID = ?2) AS hasAccess
-- FROM "group" g
-- WHERE g.ID = ?1;

SELECT EXISTS(SELECT * FROM groupMember gm WHERE gm.groupID = ?1 AND gm.userID = ?2 AND response = 'accepted') AS hasAccess
