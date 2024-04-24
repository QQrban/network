-- SELECT EXISTS(SELECT * FROM "group" g WHERE g.groupID = ?1 AND g.type = 'public')
--     OR EXISTS(SELECT * FROM groupInvite gi WHERE gi.groupID = ?1 AND gi.receiverID = ?2);

-- SELECT EXISTS(SELECT * FROM groupInvite gi WHERE gi.groupID = ?1 AND gi.receiverID = ?2);
SELECT EXISTS(SELECT * FROM groupMember gm WHERE gm.groupID = ?1 AND gm.userID = ?2 AND gm.type = 'invite' AND gm.response = 'pending');

