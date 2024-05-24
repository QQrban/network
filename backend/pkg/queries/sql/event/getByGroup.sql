SELECT e.*, IFNULL(eM.option, 'UNSET')
FROM event e
   LEFT JOIN eventMember eM on e.ID = eM.eventID AND eM.userID = ?2
WHERE groupID = ?1
ORDER BY e.time DESC, e.ID DESC;
