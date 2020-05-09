DROP DATABASE IF EXISTS `for_rover`;
CREATE DATABASE `for_rover`;

use for_rover;

select * from users;

select * from userMatches;

INSERT INTO usermatches (UserOneId, UserTwoId, userOneStatus, userTwoStatus, createdAt, updatedAt)
VALUES (1, 2, "pending", "pending", NOW(), NOW());