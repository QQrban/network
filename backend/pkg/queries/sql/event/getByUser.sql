SELECT e.*, IFNULL(eM.option, 'UNSET') AS myStatus
FROM event e
   JOIN eventMember eM ON
      e.ID = eM.eventID AND
      eM.userID = ?1; --AND
      --eM.option = ?2;
ORDER BY e.time DESC, e.ID DESC;

