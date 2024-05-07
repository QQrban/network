INSERT INTO user 
(email, password, firstname, lastname, nickname, image, about, birthday, private, country)
VALUES 
('tom@kood.ee', 'zaq12wsx', 'Tom', 'Voog', 'tom', NULL, 'Backend Developer', '1960-10-24T00:00:00Z', false, 'EE'),
('kurb@kood.ee', 'zaq12wsx', 'Kurban', 'Ramazanov', 'kramazan', NULL, 'Frontend Developer', '1990-05-10T00:00:00Z', false, 'EE'),
('nipi@kood.ee', 'zaq12wsx', 'Nipi', 'Tiri', 'nipi', NULL, 'Full-stack Developer', '2010-01-01T00:00:00Z', true, 'BG');


INSERT INTO follow 
(followerID, followeeID, created, responded, response)
VALUES 
(1, 2, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(1, 3, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "pending"),
(2, 1, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(2, 3, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(3, 1, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "reject"),
(3, 2, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept");

INSERT INTO userMessage
(senderID, receiverID, content, created)
VALUES 
(1, 2, 'Hello Kurb!', datetime(CURRENT_TIMESTAMP, "-1 days")),
(2, 1, 'Hello Tom!', datetime(CURRENT_TIMESTAMP, "-10 hours")),
(1, 3, 'Hello Nipi!', datetime(CURRENT_TIMESTAMP, "-8 hours")),
(3, 1, 'Hello Tom!', datetime(CURRENT_TIMESTAMP, "-6 hours")),
(2, 3, 'Hello Nipi!', datetime(CURRENT_TIMESTAMP, "-4 hours")),
(3, 2, 'Hello Kurb!', datetime(CURRENT_TIMESTAMP, "-30 minutes"));

INSERT INTO post
(authorID, groupID, content, status, images, aboutID, created)
VALUES 
(1, NULL, 'Hello World!', 'public', '', NULL, datetime(CURRENT_TIMESTAMP, "-1 days")),
(2, NULL, 'Hello World!', 'private', '', NULL, datetime(CURRENT_TIMESTAMP, "-10 hours")),
(3, NULL, 'Hi there too!', 'public', '', 1, datetime(CURRENT_TIMESTAMP, "-8 hours"));
-- (1, NULL, 'Hello World!', 'public', '', NULL, datetime(CURRENT_TIMESTAMP, "-6 hours")),
-- (1, NULL, 'Hello World!', 'public', '', NULL, datetime(CURRENT_TIMESTAMP, "-6 hours")),
-- (2, NULL, 'Hello World!', 'public', '', NULL, datetime(CURRENT_TIMESTAMP, "-4 hours")),
-- (3, NULL, 'Hello World!', 'public', '', NULL, datetime(CURRENT_TIMESTAMP, "-30 minutes"));