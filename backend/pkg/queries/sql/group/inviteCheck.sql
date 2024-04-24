SELECT EXISTS(
   SELECT * FROM groupMember 
   WHERE groupID = ?1 
      AND memberID = ?2 
      AND type = 'invite' 
      AND response = 'pending'
);
