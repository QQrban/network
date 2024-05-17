UPDATE groupMember 
   SET response = ?3,
      responded = CURRENT_TIMESTAMP
WHERE groupID = ?1 
   AND userID = ?2;