-- SELECT *,
--        EXISTS(SELECT * FROM groupMember gm WHERE gm.groupID = g.groupID AND gm.userID = ?2) as includesMe,
--        EXISTS(SELECT * FROM groupRequest gr WHERE gr.groupID = g.groupID AND gr.senderID = ?2) as pendingRequest
-- FROM "group" g
-- WHERE groupID = ?1;

SELECT g.*
FROM "group" g
JOIN groupMember gm ON g.groupID = gm.groupID AND gm.userID = ?2
WHERE g.ID = ?1;