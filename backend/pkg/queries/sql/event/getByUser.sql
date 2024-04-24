SELECT e.*
FROM event e
   JOIN eventMember eM ON
      e.ID = eM.eventID AND
      eM.userID = ?1 AND
      eM.option = ?2;
