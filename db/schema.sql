DROP DATABASE IF EXISTS `for_rover`;
CREATE DATABASE `for_rover`;

use for_rover;

select * from users;

select * from userMatches;

DELETE FROM userMatches;

INSERT INTO usermatches (UserOneId, UserTwoId, userOneStatus, userTwoStatus, createdAt, updatedAt)
VALUES (1, 2, "pending", "pending", NOW(), NOW());

INSERT INTO usermatches (UserOneId, UserTwoId, userOneStatus, userTwoStatus, createdAt, updatedAt)
VALUES (1, 3, "pending", "pending", NOW(), NOW());

INSERT INTO usermatches (UserOneId, UserTwoId, userOneStatus, userTwoStatus, createdAt, updatedAt)
VALUES (4, 1, "pending", "pending", NOW(), NOW());

INSERT INTO usermatches (UserOneId, UserTwoId, userOneStatus, userTwoStatus, createdAt, updatedAt)
VALUES (5, 1, "pending", "matched", NOW(), NOW());

INSERT INTO usermatches (UserOneId, UserTwoId, userOneStatus, userTwoStatus, createdAt, updatedAt)
VALUES (6, 1, "pending", "matched", NOW(), NOW());