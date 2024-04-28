SELECT EXISTS(
   SELECT * FROM groupMember 
   WHERE groupID = ?1 
      AND userID = ?2 
      AND type = 'request'
      AND response = 'pending'
);
