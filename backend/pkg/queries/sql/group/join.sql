UPDATE groupMember 
   SET response = 'accepted',
      responded = CURRENT_TIMESTAMP
WHERE groupID = ?1 
   AND userID = ?2;