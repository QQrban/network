SELECT u.* FROM user u 
   JOIN "like" l ON l.userID = u.ID 
WHERE l.postID = ?1;