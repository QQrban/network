SELECT user.*, 
       EXISTS(SELECT * FROM follow f WHERE f.followerID = ?1 AND f.followeeID = user.ID AND f.response = 'accept') AS meToYou,
       EXISTS(SELECT * FROM follow fr WHERE fr.followerID = ?1 AND fr.followeeID = user.ID AND fr.response = 'pending') AS meToYouPending,
       EXISTS(SELECT * FROM follow fr WHERE fr.followerID = user.ID AND fr.followeeID = ?1 AND fr.response = 'pending') AS youToMePending
 FROM follow f
JOIN user ON f.followeeID = user.ID
WHERE f.followerID = ?2
AND f.response != 'reject';
