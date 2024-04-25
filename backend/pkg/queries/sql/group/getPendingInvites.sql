SELECT userID
FROM groupMember
WHERE groupID = ? AND response = 'pending' AND type = 'invite';
