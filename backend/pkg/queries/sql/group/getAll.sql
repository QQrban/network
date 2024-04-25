SELECT g.*
FROM "group" g
JOIN groupMember gm ON g.ID = gm.groupID AND gm.userID = ?1
WHERE gm.response = 'accepted';

-- SELECT *,
--        EXISTS(SELECT * FROM groupMember gm WHERE gm.groupID = g.ID AND gm.userID = ?1 ) as includesMe,
--        EXISTS(SELECT * FROM groupRequest gr WHERE gr.groupID = g.groupID AND gr.senderID = ?1 ) as pendingRequest
-- FROM "group" g
-- WHERE g.type = 'public' OR includesMe = TRUE;
