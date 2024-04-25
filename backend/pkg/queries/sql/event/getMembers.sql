SELECT u.*, eM.option
FROM event e
         JOIN eventMember eM ON e.ID = eM.eventID
         JOIN user u ON eM.userID = u.ID
WHERE e.ID = ?1;
