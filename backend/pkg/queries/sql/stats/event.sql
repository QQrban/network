SELECT option, COUNT(*) AS responses 
FROM eventMember WHERE eventID=?1 GROUP BY option;