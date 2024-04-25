INSERT INTO user 
(email, password, firstname, lastname, nickname, image, about, birthday, private, country)
VALUES 
('tom@kood.ee', 'zaq12wsx', 'Tom', 'Voog', 'tom', NULL, 'backend dev', CURRENT_TIMESTAMP, false, 'EE'),
('kurb@kood.ee', 'zaq12wsx', 'Kurb', 'Rama', 'kurb', NULL, 'frontend dev', CURRENT_TIMESTAMP, false, 'EE'),
('nipi@kood.ee', 'zaq12wsx', 'Nipi', 'Tiri', 'nipi', NULL, 'full-stack dev', CURRENT_TIMESTAMP, true, 'EE');

INSERT INTO follow 
(followerID, followeeID, response)
VALUES 
(1, 2, "accepted"),
(1, 3, "pending"),
(2, 1, "accepted"),
(2, 3, "accepted"),
(3, 1, "rejected"),
(3, 2, "accepted");

INSERT INTO userMessage
(senderID, receiverID, content, created)
VALUES 
(1, 2, 'Hello Kurb!', datetime(CURRENT_TIMESTAMP, "-1 days")),
(2, 1, 'Hello Tom!', datetime(CURRENT_TIMESTAMP, "-10 hours")),
(1, 3, 'Hello Nipi!', datetime(CURRENT_TIMESTAMP, "-8 hours")),
(3, 1, 'Hello Tom!', datetime(CURRENT_TIMESTAMP, "-6 hours")),
(2, 3, 'Hello Nipi!', datetime(CURRENT_TIMESTAMP, "-4 hours")),
(3, 2, 'Hello Kurb!', datetime(CURRENT_TIMESTAMP, "-30 minutes"));
