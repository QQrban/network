SELECT count(*) != 0
FROM groupMember gm
WHERE gm.groupID = ?1
  AND gm.userID = ?2;
  AND gm.response = 'accepted';
