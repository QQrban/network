UPDATE user SET private = 1 - private WHERE ID = ?1;
SELECT private FROM user WHERE ID = ?1;
