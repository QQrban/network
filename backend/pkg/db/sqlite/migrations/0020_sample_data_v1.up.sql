INSERT INTO user 
(email, password, firstname, lastname, nickname, image, about, birthday, private, country)
VALUES 
('tom@kood.ee', 'zaq12wsx', 'Tom', 'Voog', 'tom', NULL, 'Backend Developer', '1960-10-24T00:00:00Z', false, 'EE'),
('kurb@kood.ee', 'zaq12wsx', 'Kurban', 'Ramazanov', 'kramazan', NULL, 'Frontend Developer', '1990-05-10T00:00:00Z', false, 'EE'),
('nipi@kood.ee', 'zaq12wsx', 'Nipi', 'Tiri', 'nipi', NULL, 'Full-stack Developer', '2010-01-01T00:00:00Z', true, 'BG'),
('denzel@kood.ee', 'zaq12wsx', 'Denzel', 'Washington', 'denzel', NULL, 'Actor', '1954-12-28T00:00:00Z', false, 'US'),
('bruce@kood.ee', 'zaq12wsx', 'Bruce', 'Willis', 'bruce', NULL, 'Actor', '1955-03-19T00:00:00Z', false, 'US'),
('george@kood.ee', 'zaq12wsx', 'George', 'Clooney', 'george', NULL, 'Actor', '1961-05-06T00:00:00Z', false, 'US'),
('nick@kood.ee', 'zaq12wsx', 'Nick', 'Nolte', 'nick', NULL, 'Actor', '1941-02-08T00:00:00Z', false, 'US'),
('alice@kood.ee', 'zaq12wsx', 'Alice', 'Cooper', 'alice', NULL, 'Musician', '1948-02-04T00:00:00Z', false, 'US'),
('tina@kood.ee', 'zaq12wsx', 'Tina', 'Turner', 'tina', NULL, 'Musician', '1939-11-26T00:00:00Z', false, 'US'),
('janja@kood.ee', 'zaq12wsx', 'Janja', 'Garnbret', 'janja', NULL, 'Climber', '1999-03-12T00:00:00Z', false, 'SI'),
('tanya@kood.ee', 'zaq12wsx', 'Tanya', 'Bogomilova', 'tanya', NULL, 'Climber', '1997-06-06T00:00:00Z', false, 'BG'),
('krystina@kood.ee', 'zaq12wsx', 'Krystina', 'Kaplan', 'krystina', NULL, 'Climber', '1999-09-01T00:00:00Z', false, 'US'),
('fedor@kood.ee', 'zaq12wsx', 'Fedor', 'Emelianenko', 'fedor', NULL, 'MMA Fighter', '1976-09-28T00:00:00Z', false, 'RU'),
('emily@kood.ee', 'zaq12wsx', 'Emily', 'Blunt', 'emily', NULL, 'Actress', '1983-02-23T00:00:00Z', false, 'GB'),
('emma@kood.ee', 'zaq12wsx', 'Emma', 'Watson', 'emma', NULL, 'Actress', '1990-04-15T00:00:00Z', false, 'GB'),
('albert@kood.ee', 'zaq12wsx', 'Albert', 'Einstein', 'albert', NULL, 'Physicist', '1879-03-14T00:00:00Z', false, 'DE'),
('richard@kood.ee', 'zaq12wsx', 'Richard', 'Feynman', 'richard', NULL, 'Physicist', '1918-05-11T00:00:00Z', false, 'US'),
('max@kood.ee', 'zaq12wsx', 'Max', 'Planck', 'max', NULL, 'Physicist', '1858-04-23T00:00:00Z', false, 'DE'),
('lee@kood.ee', 'zaq12wsx', 'Lee', 'Smolin', 'lee', NULL, 'Physicist', '1955-06-06T00:00:00Z', false, 'CA'),
('vlad@kood.ee', 'zaq12wsx', 'Vlad', 'Tepes', 'vlad', NULL, 'Prince', '1431-11-08T00:00:00Z', false, 'RO'),
('maximilian@kood.ee', 'zaq12wsx', 'Maximilian', 'Kolbe', 'maximilian', NULL, 'Saint', '1894-01-08T00:00:00Z', false, 'PL'),
('elisabeth@kood.ee', 'zaq12wsx', 'Elisabeth', 'Hasselbeck', 'elisabeth', NULL, 'TV Host', '1977-05-28T00:00:00Z', false, 'US'),
('paul@kood.ee', 'zaq12wsx', 'Paul', 'McCartney', 'paul', NULL, 'Musician', '1942-06-18T00:00:00Z', false, 'GB');



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