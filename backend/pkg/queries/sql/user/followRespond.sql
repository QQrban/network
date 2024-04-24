UPDATE follow 
  SET response = ?1,
      responded = CURRENT_TIMESTAMP
WHERE followerID = ?2 AND followeeID = ?3;
