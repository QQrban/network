SELECT * FROM group g
JOIN group_member gm ON g.id = gm.group_id
WHERE gm.user_id != $1
