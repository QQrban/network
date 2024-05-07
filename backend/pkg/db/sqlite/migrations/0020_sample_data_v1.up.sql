INSERT INTO user 
(email, password, firstname, lastname, nickname, image, about, birthday, private, country)
VALUES 
('tom@kood.ee', 'zaq12wsx', 'Tom', 'Voog', 'tom', NULL, 'Backend Developer', '1960-10-24T00:00:00Z', false, 'EE'),
('kurb@kood.ee', 'zaq12wsx', 'Kurban', 'Ramazanov', 'kramazan', NULL, 'Frontend Developer', '1990-05-10T00:00:00Z', false, 'EE'),
('nipi@kood.ee', 'zaq12wsx', 'Nipi', 'Tiri', 'nipi', NULL, 'Full-stack Developer', '2010-01-01T00:00:00Z', true, 'BG');
('sara@kood.ee', 'zaq12wsx', 'Sara', 'Kivi', 'skivi', NULL, 'Backend Developer', '1988-03-15T00:00:00Z', false, 'RU'),
('marko@kood.ee', 'zaq12wsx', 'Marko', 'Mets', 'mmets', NULL, 'Frontend Developer', '1992-07-22T00:00:00Z', true, 'FR'),
('liina@kood.ee', 'zaq12wsx', 'Liina', 'Vaher', 'lvaher', NULL, 'Full-stack Developer', '1995-11-30T00:00:00Z', false, 'AM'),
('juhan@kood.ee', 'zaq12wsx', 'Juhan', 'Lepp', 'jlepp', NULL, 'Backend Developer', '1985-02-17T00:00:00Z', true, 'BI'),
('kristi@kood.ee', 'zaq12wsx', 'Kristi', 'Tamm', 'ktamm', NULL, 'Frontend Developer', '1999-12-12T00:00:00Z', false, 'EE'),
('oliver@kood.ee', 'zaq12wsx', 'Oliver', 'Saar', 'osaar', NULL, 'Full-stack Developer', '2001-08-19T00:00:00Z', true, 'EE'),
('eva@kood.ee', 'zaq12wsx', 'Eva', 'Kask', 'ekask', NULL, 'Backend Developer', '1970-05-25T00:00:00Z', false, 'EE'),
('lauri@kood.ee', 'zaq12wsx', 'Lauri', 'Paju', 'lpaju', NULL, 'Frontend Developer', '1983-09-09T00:00:00Z', true, 'EE'),
('anneli@kood.ee', 'zaq12wsx', 'Anneli', 'Orav', 'aorav', NULL, 'Full-stack Developer', '1994-06-07T00:00:00Z', false, 'EE'),
('toomas@kood.ee', 'zaq12wsx', 'Toomas', 'Hein', 'thein', NULL, 'Backend Developer', '1989-10-10T00:00:00Z', true, 'EE');


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