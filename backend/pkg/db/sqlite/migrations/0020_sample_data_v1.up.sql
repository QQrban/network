INSERT INTO user 
(email, password, firstname, lastname, nickname, image, about, birthday, private, country)
VALUES 
-- password: zaq12wsx
('tom@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Tom', 'Voog', 'tom', NULL, 'Backend Developer', '1960-10-24T00:00:00Z', false, 'EE'),
('kurb@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Kurban', 'Ramazanov', 'kramazan', NULL, 'Frontend Developer', '1990-05-10T00:00:00Z', false, 'EE'),
('nipi@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Nipi', 'Tiri', 'nipi', NULL, 'Full-stack Developer', '2010-01-01T00:00:00Z', true, 'BG'),
('denzel@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Denzel', 'Washington', 'denzel', NULL, 'Actor', '1954-12-28T00:00:00Z', false, 'US'),
('bruce@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Bruce', 'Willis', 'bruce', NULL, 'Actor', '1955-03-19T00:00:00Z', false, 'US'),
('george@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'George', 'Clooney', 'george', NULL, 'Actor', '1961-05-06T00:00:00Z', false, 'US'),
('nick@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Nick', 'Nolte', 'nick', NULL, 'Actor', '1941-02-08T00:00:00Z', false, 'US'),
('alice@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Alice', 'Cooper', 'alice', NULL, 'Musician', '1948-02-04T00:00:00Z', false, 'US'),
('tina@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Tina', 'Turner', 'tina', NULL, 'Musician', '1939-11-26T00:00:00Z', false, 'US'),
('janja@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Janja', 'Garnbret', 'janja', NULL, 'Climber', '1999-03-12T00:00:00Z', false, 'SI'),
('tanya@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Tanya', 'Bogomilova', 'tanya', NULL, 'Climber', '1997-06-06T00:00:00Z', false, 'BG'),
('krystina@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Krystina', 'Kaplan', 'krystina', NULL, 'Climber', '1999-09-01T00:00:00Z', false, 'US'),
('fedor@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Fedor', 'Emelianenko', 'fedor', NULL, 'MMA Fighter', '1976-09-28T00:00:00Z', false, 'RU'),
('emily@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Emily', 'Blunt', 'emily', NULL, 'Actress', '1983-02-23T00:00:00Z', false, 'GB'),
('emma@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Emma', 'Watson', 'emma', NULL, 'Actress', '1990-04-15T00:00:00Z', false, 'GB'),
('albert@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Albert', 'Einstein', 'albert', NULL, 'Physicist', '1879-03-14T00:00:00Z', false, 'DE'),
('richard@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Richard', 'Feynman', 'richard', NULL, 'Physicist', '1918-05-11T00:00:00Z', false, 'US'),
('max@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Max', 'Planck', 'max', NULL, 'Physicist', '1858-04-23T00:00:00Z', false, 'DE'),
('lee@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Lee', 'Smolin', 'lee', NULL, 'Physicist', '1955-06-06T00:00:00Z', false, 'CA'),
('vlad@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Vlad', 'Tepes', 'vlad', NULL, 'Prince', '1431-11-08T00:00:00Z', false, 'RO'),
('maximilian@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Maximilian', 'Kolbe', 'maximilian', NULL, 'Saint', '1894-01-08T00:00:00Z', false, 'PL'),
('elisabeth@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Elisabeth', 'Hasselbeck', 'elisabeth', NULL, 'TV Host', '1977-05-28T00:00:00Z', false, 'US'),
('paul@kood.ee', '$2a$10$7FvPLhcsmzujjKieaiqCnOYxHbfwfBEeZxEv.P74MxPWCGdb.wxwC', 'Paul', 'McCartney', 'paul', NULL, 'Musician', '1942-06-18T00:00:00Z', false, 'GB');

INSERT INTO "group"
(ownerID, title, description, created)
VALUES
(1, 'Developers', 'Developers group', datetime(CURRENT_TIMESTAMP, "-1 days")),
(2, 'Climbers', 'Climbers group', datetime(CURRENT_TIMESTAMP, "-10 hours")),
(3, 'Actors', 'Actors group', datetime(CURRENT_TIMESTAMP, "-8 hours")),
(4, 'Musicians', 'Musicians group', datetime(CURRENT_TIMESTAMP, "-6 hours")),
(5, 'Physicists', 'Physicists group', datetime(CURRENT_TIMESTAMP, "-4 hours")),
(6, 'Saints', 'Saints group', datetime(CURRENT_TIMESTAMP, "-30 minutes")),
(7, 'Politicians', 'Politicians group', datetime(CURRENT_TIMESTAMP, "-30 minutes"));

INSERT INTO groupMember
(groupID, userID, memberID, type, presented, responded, response)
VALUES
(1, 1, 1, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(1, 2, 1, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(1, 3, 1, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(3, 4, 4, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(3, 5, 4, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(3, 6, 5, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(2, 10, 10, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(4, 8, 8, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(4, 9, 8, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(5, 16, 16, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(5, 17, 16, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(5, 18, 16, 'request', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(6, 21, 21, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(6, 22, 21, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept'),
(7, 23, 23, 'invite', datetime(CURRENT_TIMESTAMP, "-1 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), 'accept');

INSERT INTO follow 
(followerID, followeeID, created, responded, response)
VALUES 
(1, 2, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(1, 3, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "pending"),
(2, 1, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(2, 3, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(3, 2, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(3, 1, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(4, 5, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(5, 4, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(6, 5, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(7, 6, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(8, 9, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(9, 8, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(10, 1, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(16, 17, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(17, 16, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(18, 16, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(21, 22, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(22, 21, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept"),
(23, 2, datetime(CURRENT_TIMESTAMP, "-2 days"), datetime(CURRENT_TIMESTAMP, "-1 days"), "accept");

INSERT INTO userMessage
(senderID, receiverID, content, created)
VALUES 
(1, 2, 'Hello Kurb!', datetime(CURRENT_TIMESTAMP, "-1 days")),
(2, 1, 'Hello Tom! How it is going?', datetime(CURRENT_TIMESTAMP, "-10 hours")),
(1, 3, 'Hello Nipi!', datetime(CURRENT_TIMESTAMP, "-8 hours")),
(3, 1, 'Hello Tom! Long time no see :)', datetime(CURRENT_TIMESTAMP, "-6 hours")),
(2, 3, 'Hi Nipi! How is your arm?', datetime(CURRENT_TIMESTAMP, "-4 hours")),
(3, 2, 'Not too bad, thanks for asking', datetime(CURRENT_TIMESTAMP, "-30 minutes"));

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