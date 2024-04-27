-- SELECT *,
--        EXISTS(SELECT * FROM groupMember gm WHERE gm.groupID = g.groupID AND gm.userID = ?2) as includesMe,
--        EXISTS(SELECT * FROM groupRequest gr WHERE gr.groupID = g.groupID AND gr.senderID = ?2) as pendingRequest
-- FROM "group" g
-- WHERE groupID = ?1;

SELECT g.*,
(gm.response IS NOT NULL AND gm.response = 'accepted') AS IncludesMe, 
(gm.response IS NOT NULL AND gm.response = 'pending') AS PendingRequest
FROM "group" g
LEFT JOIN groupMember gm ON g.ID = gm.groupID AND gm.userID = ?2
WHERE g.ID = ?1;