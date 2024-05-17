SELECT *,
       EXISTS(SELECT * FROM follow f WHERE f.followerID = ?2 AND f.followeeID = ?1 AND f.response = 'accept') AS meToYou,
       EXISTS(SELECT * FROM follow fr WHERE fr.followerID = ?2 AND fr.followeeID = ?1 AND fr.response = 'pending') AS meToYouPending,
       EXISTS(SELECT * FROM follow fr WHERE fr.followerID = ?1 AND fr.followeeID = ?2 AND fr.response = 'pending') AS youToMePending
FROM user
WHERE ID = ?1
