SELECT DISTINCT u.ID,u.FirstName,u.LastName,u.Nickname,u.Image 
FROM user u
JOIN userMessage um
ON u.ID = um.senderID
OR u.ID = um.receiverID
WHERE u.ID != ?1 and  u.ID != 0
ORDER BY LastName, FirstName