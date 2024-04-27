SELECT g.*, (gm.response IS NOT NULL AND gm.response = 'accepted') AS IncludesMe, (gm.response IS NOT NULL AND gm.response = 'pending') AS PendingRequest
FROM "group" g
LEFT JOIN groupMember gm ON g.ID = gm.groupID AND gm.userID = ?1
--WHERE gm.response != 'rejected';

-- SELECT *,
--        EXISTS(SELECT * FROM groupMember gm WHERE gm.groupID = g.ID AND gm.userID = ?1 ) as includesMe,
--        EXISTS(SELECT * FROM groupRequest gr WHERE gr.groupID = g.groupID AND gr.senderID = ?1 ) as pendingRequest
-- FROM "group" g
-- WHERE g.type = 'public' OR includesMe = TRUE;
