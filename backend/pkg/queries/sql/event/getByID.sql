SELECT e.*, IFNULL(eM.status, 'UNSET')
FROM event e
         LEFT JOIN eventMember eM on e.ID = eM.eventID AND eM.userID = ?2
WHERE e.ID = ?1;
