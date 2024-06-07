SELECT e.*, IFNULL(eM.option, '2')
FROM event e
   LEFT JOIN eventMember eM on e.ID = eM.eventID AND eM.userID = ?2
WHERE groupID = ?1
ORDER BY e.time ASC, e.ID DESC;
